import httpMocks from 'node-mocks-http';
import validateRequestMiddleware from '../validateRequest';
import { z } from 'zod';
import { type ExtendedError } from '../../utils/error/error';
import { StatusCodes } from 'http-status-codes';
import cases from 'jest-in-case';

describe('validateRequestMiddleware', () => {
    it('should call next if request is valid', async () => {
        const req = httpMocks.createRequest({
            body: { name: 'someName' },
            query: { id: '1' },
            params: { id: '1' },
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        const schema = z.object({
            body: z.object({
                name: z.string().min(1, 'Minimum length for username is 1'),
            }),
            query: z.object({ id: z.string() }),
            params: z.object({ id: z.string() }),
        });

        await validateRequestMiddleware(schema)(req, res, next);
        expect(next).toHaveBeenCalled();
    });
    cases(
        'it should throw error if request is invalid',
        async ({ schema, arg }) => {
            const req = httpMocks.createRequest(arg);
            const res = httpMocks.createResponse();
            const next = jest.fn();

            try {
                await validateRequestMiddleware(schema)(req, res, next);
            } catch (e) {
                const err = e as ExtendedError;
                expect(err).toStrictEqual({
                    message: 'zod request validation error',
                    statusCode: StatusCodes.BAD_REQUEST,
                });
            }
        },
        [
            {
                name: 'invalid body',
                schema: z.object({
                    body: z.object({
                        name: z
                            .string()
                            .min(1, 'Minimum length for username is 1'),
                    }),
                }),
                arg: { body: { name: '' } },
            },

            {
                name: 'invalid query',
                schema: z.object({
                    query: z.object({ id: z.string() }),
                }),
                arg: { query: { id: 1 } },
            },
            {
                name: 'invalid params',
                schema: z.object({
                    params: z.object({ id: z.string() }),
                }),
                arg: { params: { id: 1 } },
            },
        ]
    );
});
