import {
    type AppReq,
    type AppRes,
} from '../../../../common/types/Request.type';
import { type LoginReq, type RefreshTokenReq } from '@services/Auth/Auth.type';
import AuthService from '@services/Auth/Auth.service';
import {logger} from '../../../../config/logger';

const login = async (loginData: AppReq, res: AppRes): Promise<void> => {
    logger.info('Auth.controller: login request starts');
    const loginDetails = await AuthService.login(loginData.body as LoginReq);
    res.status(200).send(loginDetails);
};

const refreshToken = async (req: AppReq, res: AppRes): Promise<void> => {
    logger.info('Auth.controller: refreshing access tokens');
    const newTokens = await AuthService.refreshToken(
        req?.body as RefreshTokenReq
    );

    res.status(200).send(newTokens);
};

export { login, refreshToken };
