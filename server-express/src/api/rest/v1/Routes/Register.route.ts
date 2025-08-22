import * as express from 'express';
import RegistrationController from '@controllers/Registration.controller';
import { asyncWrapper } from '../../../../middleware/asyncWrapper';
import validateRequestMiddleware from '../../../../middleware/validateRequest';
import RegisterSchemas from '../../../../validators/Register.validators';
const createRouter = (): express.Router => {
    const router = express.Router();
    router.post(
        '/register',
        asyncWrapper(
            validateRequestMiddleware(RegisterSchemas.UserRegisterSchema)
        ),
        asyncWrapper(RegistrationController.register)
    );

    return router;
};

export default createRouter;
