import { Router } from 'express';
import CreateUserRouter from '../Routes/User.route';
import CreateAuthRouter from '../Routes/Auth.route';
import CreateRegisterRouter from '../Routes/Register.route';
import CreateAdminRouter from '../Routes/Admin.route';

const apiV1 = Router()
    .use('/user', CreateUserRouter())
    .use('/auth', CreateAuthRouter())
    .use('/registration', CreateRegisterRouter())
    .use('/admin', CreateAdminRouter());

export default apiV1;
