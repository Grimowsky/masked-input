import * as express from 'express';
import { asyncWrapper } from '../../../../middleware/asyncWrapper';
import * as AdminController from '../Controllers/Admin.controller';
import jwtMiddleware from '../../../../middleware/jwtMiddleware';
import roleMiddleware from '../../../../middleware/roleMiddleware';
const createRouter = (): express.Router => {
    const router = express.Router();

    router.get(
        '/users/list',
        jwtMiddleware.verifyAuthToken,
        roleMiddleware(['admin']),
        asyncWrapper(AdminController.usersList)
    );

    return router;
};

export default createRouter;
