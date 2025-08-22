import type { AnyZodObject } from 'zod';
import type { AppNext, AppReq, AppRes } from '../common/types/Request.type';
import { ExtendedError } from '../utils/error/error';
import { StatusCodes } from 'http-status-codes';

const validateRequestMiddleware =
    (schema: AnyZodObject) =>
    async (req: AppReq, _res: AppRes, next: AppNext) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
        } catch (e) {
            throw ExtendedError.of(
                'zod request validation error',
                StatusCodes.BAD_REQUEST
            );
        }

        next();
    };

export default validateRequestMiddleware;
