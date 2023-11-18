
import { Controller, Get, Res, Session, UseBefore } from "routing-controllers";
import { isAuthenticated } from "../middlewares/IsAuthenticated";
import { Service } from "typedi";
import { Response } from "express";
import { EventService } from "../services/EventsService";

@Service()
@Controller('/sse')
@UseBefore(isAuthenticated)
export class EventsController {
    constructor(private readonly eventService: EventService) { }

    @Get()
    public async openSSE(@Res() res: Response, @Session() session) {

        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();

        const sendEvent = (event) => {
            if (!event) {
                res.end();
                return false;
            }
            const resWriteResponse = res.write(`event: ${event.type}\ndata: ${event.data}\n\n`);
            if (!resWriteResponse) {
                return false;
            }

            return true;
        }

        this.eventService.subscribe(session.user.id, sendEvent);

        res.on('close', () => {
            res.end();
        });

        return res;
    }
}