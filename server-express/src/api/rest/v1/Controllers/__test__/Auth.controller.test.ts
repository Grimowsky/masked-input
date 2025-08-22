import httpMocks from 'node-mocks-http';
import {logger} from '../../../../../config/logger';
import { login, refreshToken } from '../Auth.controller';
import AuthService from '@services/Auth/Auth.service';

describe('Auth.controller', () => {
    it('Should handle login request', async () => {
        jest.spyOn(logger, 'info');
        jest.spyOn(AuthService, 'login').mockResolvedValue({
            token: 'token',
            refreshToken: 'refreshToken',
        });

        const req = httpMocks.createRequest({
            body: {
                username: 'username',
                password: 'password',
            },
        });
        const res = httpMocks.createResponse();

        await login(req, res);

        expect(logger.info).toHaveBeenCalledWith(
            'Auth.controller: login request starts'
        );
        expect(AuthService.login).toHaveBeenCalledWith(req.body);
        expect(res._getData()).toEqual({
            token: 'token',
            refreshToken: 'refreshToken',
        });
    });
    it('refreshes access tokens', async () => {
        jest.spyOn(logger, 'info');
        jest.spyOn(AuthService, 'refreshToken').mockResolvedValue({
            token: 'token',
            refreshToken: 'refreshToken',
        });

        const req = httpMocks.createRequest({
            body: {
                refreshToken: 'refreshToken',
            },
        });

        const res = httpMocks.createResponse();

        await refreshToken(req, res);

        expect(logger.info).toHaveBeenCalledWith(
            'Auth.controller: refreshing access tokens'
        );
        expect(AuthService.refreshToken).toHaveBeenCalledWith(req.body);
        expect(res._getData()).toEqual({
            token: 'token',
            refreshToken: 'refreshToken',
        });
    });
});
