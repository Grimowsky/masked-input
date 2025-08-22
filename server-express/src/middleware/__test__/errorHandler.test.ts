import httpMocks from 'node-mocks-http';
import { errorHandler } from '../errorHandler';
import {logger} from '../../config/logger';
import { type AppErr } from '../../common/types/Request.type';

describe('errorHandler', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should handle status code for given error', () => {
        jest.spyOn(logger, 'error').mockImplementation(jest.fn());
        const EXPECTED_ERROR_MESSAGE = 'custom error';
        const error = {
            statusCode: 401,
            message: 'custom error',
            name: 'custom error',
        } satisfies AppErr;

        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const next = jest.fn();

        errorHandler()(error, req, res, next);

        expect(logger.error).toHaveBeenCalledWith(
            'Express error handler',
            error
        );
        expect(res.statusCode).toBe(401);
        expect(res._getData()).toBe(
            JSON.stringify({
                error: {
                    message: EXPECTED_ERROR_MESSAGE,
                },
            })
        );
    });
    it('Should handle INTERNAL_SERVER_ERR status code for nullish status code', () => {
        const EXPECTED_ERROR_MESSAGE = 'Internal Server Error occured';
        jest.spyOn(logger, 'error').mockImplementation(jest.fn());

        const error = new Error('test error');
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const next = jest.fn();

        errorHandler()(error, req, res, next);

        expect(logger.error).toHaveBeenCalledWith(
            'Express error handler',
            error
        );
        expect(res.statusCode).toBe(500);
        expect(res._getData()).toBe(
            JSON.stringify({
                error: {
                    message: EXPECTED_ERROR_MESSAGE,
                },
            })
        );
    });
});
