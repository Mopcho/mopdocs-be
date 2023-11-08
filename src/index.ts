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
import { configure, format, transports } from 'winston';
import { isAuthenticated } from './api/middlewares/IsAuthenticated';
import { CorsOptions } from 'cors';
import { DeleteSessionOnExpiredDate } from './api/middlewares/CheckSession';
import { S3 } from '@aws-sdk/client-s3';

// Configure AWS S3
const accessKeyId = process.env.AWS_KEY;
const secretAccessKey = process.env.AWS_SECRET;
const region = process.env.AWS_BUCKET_REGION;
Container.set('s3Client', new S3({ credentials: { accessKeyId, secretAccessKey }, region }));

const app = express();

const corsConfig: CorsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
}

// Configure IoC containers
useContainer(Container);

// Configure Winston
configure({
    transports: [
        new transports.Console({
            level: 'debug',
            handleExceptions: true,
            format: format.combine(
                format.colorize(),
                format.simple()
            ),
        }),
    ],
});

// Configure JSON
app.use(express.json());

// Configure expressSession with Prisma
app.use(
    expressSession({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict'
        },
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
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

// Configure express, add controllers, add options etc..
useExpressServer(app, {
    routePrefix: '/api',
    cors: corsConfig,
    controllers: [AuthController, FileController],
    defaultErrorHandler: false,
    middlewares: [
        GlobalErrorHandler,
        DeleteSessionOnExpiredDate,
        isAuthenticated
    ]
});

app.listen(3000, () => {
    console.log("Listen on port 3000");
});

