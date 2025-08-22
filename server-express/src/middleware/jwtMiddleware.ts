import * as JWT from 'jsonwebtoken';
import * as process from 'process';
import {
    type AppNext,
    type AppReq,
    type AppRes,
} from '../common/types/Request.type';
import { StatusCodes } from 'http-status-codes';
import { type JwtPayload } from 'jsonwebtoken';
import { type User } from '@services/User/User.type';
import { type Role } from '../common/types/roles.type';

const SECRET = process.env.JWT_SECRET || 'secretKey';

type TokenData = Partial<User> & { id: string; role: Role };

interface DecodedTokenData {
    data: {
        username: string;
        id: string;
        role: Role;
    };
    iat: number;
    exp: number;
}
const createToken = (data: TokenData): string => {
    return JWT.sign({ data }, SECRET, { expiresIn: '1h' });
};

const createRefreshToken = (data: TokenData): string => {
    return JWT.sign({ data }, SECRET, { expiresIn: '2h' });
};

const verifyAccessToken = (token: string): JwtPayload | string => {
    return JWT.verify(token, SECRET);
};

const decodeUserFromToken = (token: string): DecodedTokenData => {
    return JWT.decode(token) as DecodedTokenData;
};

const authenticateToken = async (
    _req: AppReq,
    res: AppRes,
    next: AppNext,
    { token }: { token: string | undefined }
): Promise<AppRes | undefined> => {
    if (!token) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .send({ message: 'Unauthorized' });
    }
    try {
        verifyAccessToken(token);
        next();
    } catch (error) {
        const jwtError = error as JWT.VerifyErrors;
        return res
            .status(StatusCodes.FORBIDDEN)
            .send({ message: jwtError?.message || 'Forbidden' });
    }
};

const verifyAuthToken = async (
    req: AppReq,
    res: AppRes,
    next: AppNext
): Promise<AppRes | undefined> => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .send({ message: 'Authorization header is missing' });
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
            message: 'Authorization token is malformed',
        });
    }

    await authenticateToken(req, res, next, { token });
};

const verifyRefreshToken = async (
    req: AppReq,
    res: AppRes,
    next: AppNext
): Promise<void> => {
    const token = req?.body?.refreshToken;

    await authenticateToken(req, res, next, { token });
};

const JwtMiddleware = {
    createToken,
    createRefreshToken,
    verifyAuthToken,
    verifyRefreshToken,
    decodeUserFromToken,
};

export default JwtMiddleware;
