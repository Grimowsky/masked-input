import httpMocks from 'node-mocks-http';
import roleMiddleware from '../roleMiddleware';
import jwtMiddleware from '../jwtMiddleware';

jest.spyOn(jwtMiddleware, 'decodeUserFromToken').mockImplementation(() => {
    return {
        data: { role: 'user', id: '1', username: 'someUserName' },
        exp: 123,
        iat: 123,
    };
});

describe('roleMiddleware', () => {
    it('should return 401 if no token is provided', async () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const next = jest.fn();

        const result = await roleMiddleware(['admin'])(req, res, next);
        expect(result?.statusCode).toBe(401);
        expect(res._getData()).toStrictEqual({ message: 'Unauthorized' });
    });
    it('should return 403 if user role is not allowed', async () => {
        const req = httpMocks.createRequest({
            headers: {
                authorization: 'Bearer 12345',
            },
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        const result = await roleMiddleware(['admin'])(req, res, next);

        expect(result?.statusCode).toBe(403);
        expect(res._getData()).toStrictEqual({ message: 'Forbidden' });
    });
    it('should call next if user role is allowed', async () => {
        const req = httpMocks.createRequest({
            headers: {
                authorization: 'Bearer 1234',
            },
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        await roleMiddleware(['user'])(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});
