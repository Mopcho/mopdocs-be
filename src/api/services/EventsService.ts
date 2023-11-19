import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { delay } from '../utils';
import { Database } from 'src/database/db';

interface SSEEvent {
    type: string;
    data: string;
}

export const prisma = new PrismaClient();

@Service()
export class EventService {
    pollInterval = 2000; // ms
    closeAfter = 90; // sec

    constructor(private readonly db: Database) { }

    public async subscribe(userId: string, sendEvent: (event?: SSEEvent) => boolean) {
        // Create a notification session
        const notificationSession = await this.db.notification_sessions.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                }
            },
        });

        // Initialize the onClose function
        const onClose = async () => {
            const notificationSessionExists = await this.db.notification_sessions.findUnique({ where: { id: notificationSession.id } });
            if (notificationSessionExists) {
                await this.db.notification_sessions.delete({ where: { id: notificationSession.id } });
            }
            sendEvent({ type: 'close', data: 'bye' });
            sendEvent(null);
        }

        // Create a ping service to periodically check if the connections is still open
        const pingService = new PingService({ onClose, pingInterval: 5000, sendEvent });
        pingService.subscribe();

        // Send some event to the client initially
        sendEvent({ type: 'hi', data: 'hi' });

        // Poll for notifications until connection is closed
        for (; ;) {
            const notifications = await this.db.notification_sessions.getNotifications({ id: notificationSession.id });

            const aborted = await new Promise((resolve) => {
                if (!pingService.isOpen) {
                    resolve(true);
                }
                notifications.map(async (notification) => {
                    const stillOpen = sendEvent({ type: notification.type, data: JSON.stringify(notification.data) });
                    await this.db.notifications.delete({ where: { id: notification.id } });
                    if (!stillOpen) {
                        resolve(true);
                    }
                });
                resolve(false);
            });

            // Close the connection if closeAfter time has been reached
            const dateDifference = (Date.now() - new Date(notificationSession.createdAt).getTime()) / 1000;
            if (dateDifference > this.closeAfter || aborted) {
                break;
            }

            await delay(this.pollInterval);
        }

        onClose();
    }
}

interface PingServiceCtor {
    pingInterval: number;
    onClose?: () => void;
    sendEvent: (event?: SSEEvent) => boolean;
}

class PingService {
    pingInterval: number;
    onClose: () => void;
    isOpen: boolean;
    sendEvent: (event?: SSEEvent) => boolean;

    constructor({ pingInterval, onClose, sendEvent }: PingServiceCtor) {
        this.pingInterval = pingInterval;
        this.onClose = onClose;
        this.sendEvent = sendEvent;
        const isOpen = this.sendEvent({ type: 'ping', data: 'ping' });
        this.isOpen = isOpen;
    }

    async subscribe() {
        for (; ;) {
            const stillOpen = this.sendEvent({ type: 'ping', data: 'ping' });
            if (!stillOpen) {
                this.isOpen = false;
                this.onClose();
                break;
            }
            await delay(this.pingInterval);
        }
    }
}