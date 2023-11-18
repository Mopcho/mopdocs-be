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
        await this.db.notification_sessions.delete({ where: { userId } }).catch();
        // Create a notification session
        const notificationSession = await this.db.notification_sessions.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });

        // Poll for notifications until connection is closed
        for (; ;) {
            const notifications = await this.db.notification_sessions.getNotifications({ id: notificationSession.id });

            const aborted = await new Promise((resolve) => {
                if (!notifications?.length) {
                    resolve(false);
                }
                notifications.map(async (notification) => {
                    const stillOpen = sendEvent({ type: notification.type, data: JSON.stringify(notification.data) });
                    await this.db.notifications.delete({ where: { id: notification.id } });
                    if (!stillOpen) {
                        resolve(true);
                    }
                    resolve(false);
                });
            });

            if (aborted) {
                break;
            }
            const dateDifference = (Date.now() - new Date(notificationSession.createdAt).getTime()) / 1000;

            if (dateDifference > this.closeAfter) {
                break;
            }
            await delay(this.pollInterval);
        }

        // Delete the notification session
        await this.db.notification_sessions.delete({ where: { id: notificationSession.id } });
        sendEvent({ type: 'close', data: 'bye' });
        sendEvent(null);
    }

    public async postMessage() {

    }
}