import RegistrationController from '@controllers/Registration.controller';
import UserService from '@services/User/User.service';
import {logger} from '../../../../../config/logger';

import httpMocks from 'node-mocks-http';
import { type User } from '@services/User/User.type';

describe('RegistrationController', () => {
    it('should register a user', async () => {
        jest.spyOn(logger, 'info');
        jest.spyOn(UserService, 'register').mockResolvedValueOnce({
            username: 'username',
            email: 'email',
            password: 'pass',
        } satisfies User);

        const req = httpMocks.createRequest({
            method: 'POST',
            body: {
                email: 'email@example.com',
                username: 'username',
                password: 'password',
            },
        });
        const res = httpMocks.createResponse();

        await RegistrationController.register(req, res);

        expect(UserService.register).toHaveBeenCalledWith({
            email: 'email@example.com',
            username: 'username',
            password: 'password',
        });
        expect(res.statusCode).toBe(200);
        expect(res._getData()).toEqual({ ok: true });
    });
});
