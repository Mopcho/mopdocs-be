import 'reflect-metadata';

// import { Logger } from './lib/logger';

// const log = new Logger(__filename);

// this shim is required
import { createExpressServer, useContainer } from 'routing-controllers';
import { FileController } from './api/controllers/FileController';
import Container from 'typedi';

useContainer(Container);

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
    controllers: [FileController],
});

// run express application on port 3000
app.listen(3000);

