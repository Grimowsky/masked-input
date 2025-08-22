import type { AppReq, AppRes } from '../../../../common/types/Request.type';
import { type User } from '@services/User/User.type';
import UserService from '@services/User/User.service';
import {logger} from '../../../../config/logger';

const register = async (req: AppReq, res: AppRes): Promise<void> => {
    logger.info('RegistrationController: register called');
    const userData: User = req.body;
    await UserService.register(userData);
    res.status(200).send({ ok: true });
};

const RegistrationController = { register };

export default RegistrationController;
