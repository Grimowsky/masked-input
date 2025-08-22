import httpMocks from 'node-mocks-http';
import {logger} from '../../../../../config/logger';
import AdminService from '@services/Admin/Admin.service';
import { usersList } from '../Admin.controller';

describe('Admin.controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('calls AdminService.getAllUsers and returns the result', async () => {
        const users = [
            { id: 1, username: 'John Doe', email: 'email@example.com' },
        ];
        jest.spyOn(AdminService, 'getAllUsers').mockResolvedValue(users);
        jest.spyOn(logger, 'info');

        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();

        await usersList(req, res);

        expect(logger.info).toHaveBeenCalledWith(
            'Admin.controller: usersList called'
        );
        expect(res.statusCode).toBe(200);
        expect(AdminService.getAllUsers).toHaveBeenCalled();
        expect(res._getData()).toEqual({ data: users });
    });
});
