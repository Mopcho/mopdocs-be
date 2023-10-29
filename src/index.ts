import 'reflect-metadata';
import express from 'express';
import expressSession from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import { useContainer, useExpressServer } from 'routing-controllers';
import { AuthController } from './api/controllers/AuthController';
import { FileController } from './api/controllers/FileController';
import Container from 'typedi';
import { GlobalErrorHandler } from './api/middlewares/GlobalErrorHandler';

const app = express();

useContainer(Container);

app.use(express.json());

app.use(
    expressSession({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000
        },
        secret: 'a santa at nasa asda asd asd',
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(
            new PrismaClient(),
            {
                checkPeriod: 2 * 60 * 1000,
                dbRecordIdIsSessionId: true,
                dbRecordIdFunction: undefined,
            }
        )
    })
);

useExpressServer(app, {
    routePrefix: '/api',
    controllers: [AuthController, FileController],
    defaultErrorHandler: false,
    middlewares: [
        GlobalErrorHandler
    ]
});

app.listen(3000, () => {
    console.log("Listen on port 3000");
});

