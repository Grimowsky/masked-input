import httpMocks from 'node-mocks-http';
import jwtMiddleware from '../jwtMiddleware';

const MOCKED_SECRET =
    '281F418467AD28CFA1690573CD0B10ED43884D99AD948695E298B09258474956';

const ONE_HOUR_DATE_OFFSET = 3600000 + 1000; // 1h + 1s

describe('jwtMiddleware', () => {
    let JWT_TOKEN: string;
    let JWT_REFRESH_TOKEN: string;
    beforeEach(() => {
        jest.resetModules();
        process.env = {
            JWT_SECRET: MOCKED_SECRET,
        };
    });
    it('should create jwt token', () => {
        JWT_TOKEN = jwtMiddleware.createToken({
            id: '123',
            role: 'user',
            username: 'user',
        });
    });
    it('should create jwt refresh token', () => {
        JWT_REFRESH_TOKEN = jwtMiddleware.createRefreshToken({
            id: '123',
            role: 'user',
            username: 'user',
        });
    });
    it('should decode user from token', () => {
        const decodedUser = jwtMiddleware.decodeUserFromToken(JWT_TOKEN);
        expect(decodedUser).toStrictEqual({
            data: {
                id: '123',
                role: 'user',
                username: 'user',
            },
            iat: expect.any(Number),
            exp: expect.any(Number),
        });
    });
    it('should throw error if token is not provided', async () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const next = jest.fn();

        const response = await jwtMiddleware.verifyAuthToken(req, res, next);

        expect(response?.statusCode).toBe(401);
        expect(res._getData()).toStrictEqual({
            message: 'Authorization header is missing',
        });
    });
    it('should throw error if token is malformed', async () => {
        const req = httpMocks.createRequest({
            headers: {
                // malformed token
                authorization: `${JWT_TOKEN}`,
            },
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        const response = await jwtMiddleware.verifyAuthToken(req, res, next);

        expect(response?.statusCode).toBe(401);
        expect(res._getData()).toStrictEqual({
            message: 'Authorization token is malformed',
        });
    });
    it('Authenticates jtw token correctly and trigger next function', async () => {
        const req = httpMocks.createRequest({
            headers: {
                authorization: `Bearer ${JWT_TOKEN}`,
            },
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        const response = await jwtMiddleware.verifyAuthToken(req, res, next);

        expect(response).toBeUndefined();
        expect(next).toHaveBeenCalled();
    });
    it('should throw forbidden error if token expired or is invalid', async () => {
        jest.useFakeTimers({
            now: new Date().getTime() + ONE_HOUR_DATE_OFFSET,
        });

        const req = httpMocks.createRequest({
            headers: {
                authorization: `Bearer ${JWT_TOKEN}`,
            },
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        await jwtMiddleware.verifyAuthToken(req, res, next);

        expect(res?.statusCode).toBe(403);
        expect(res._getData()).toStrictEqual({
            message: 'jwt expired',
        });

        jest.useRealTimers();
    });
    it('should verify refresh token', async () => {
        const req = httpMocks.createRequest({
            body: {
                refreshToken: JWT_REFRESH_TOKEN,
            },
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        await jwtMiddleware.verifyRefreshToken(req, res, next);

        expect(next).toHaveBeenCalled();
    });
    it('should throw error if refresh token is not provided', async () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const next = jest.fn();

        await jwtMiddleware.verifyRefreshToken(req, res, next);

        expect(res?.statusCode).toBe(401);
        expect(res._getData()).toStrictEqual({
            message: 'Unauthorized',
        });
    });
});
