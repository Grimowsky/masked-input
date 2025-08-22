import { type AppNext, type AppRes } from '../common/types/Request.type';
import type { Request, RequestHandler } from 'express';

export type AsyncRequestHandler<TP, TResBody, TReqBody> = (
    ...params: Parameters<RequestHandler<TP, TResBody, TReqBody>>
) => // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
Promise<AppRes | void>;

export const asyncWrapper =
    <TP, TResBody, TReqBody>(
        fn: AsyncRequestHandler<TP, TResBody, TReqBody>
    ): RequestHandler<TP, TResBody, TReqBody> =>
    async (req: Request<TP, TResBody, TReqBody>, res: AppRes, next: AppNext) =>
        await fn(req, res, next).catch(next);
