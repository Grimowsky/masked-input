import {
    type AppErr,
    type AppNext,
    type AppReq,
    type AppRes,
} from '../common/types/Request.type';
import { StatusCodes } from 'http-status-codes';
import {logger} from '../config/logger';
export const errorHandler =
    () => (error: AppErr, _req: AppReq, res: AppRes, _next: AppNext) => {
        logger.error('Express error handler', error);
        const statusErrorCode = error?.statusCode ?? error?.status;

        if (statusErrorCode != null) {
            res.status(statusErrorCode).json({
                error: {
                    message: error.message ?? 'Unknown error',
                },
            });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: {
                    message: 'Internal Server Error occured',
                },
            });
        }
    };
