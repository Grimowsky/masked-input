import * as http from 'http';
import {logger} from './config/logger';
import {app} from "./app";

const PORT = process?.env?.PORT || 8080;

const server = http.createServer(app);

const startServer = async (): Promise<void> => {
    server.listen(8080, '0.0.0.0', 0, () => {
        logger.info(`---Listening on port ${PORT}---`);
    });
};

void (async () => {
    logger.info('Starting app');
    await startServer();
})().catch((error) => {
    logger.error('App startup error', error);
});
