import type { AppReq, AppRes } from '../../../../common/types/Request.type';
import AdminService from '@services/Admin/Admin.service';
import {logger} from '../../../../config/logger';
const usersList = async (_req: AppReq, res: AppRes): Promise<void> => {
    logger.info('Admin.controller: usersList called');
    const users = await AdminService.getAllUsers();
    res.status(200).send({ data: users });
};

export { usersList };
