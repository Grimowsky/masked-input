import type express from 'express';

export type AppReq = express.Request;
export type AppRes = express.Response;
export type AppNext = express.NextFunction;
export type AppErr = Error & { statusCode?: number } & { status?: number };
