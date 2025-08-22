import * as express from 'express';
import { asyncWrapper } from '../../../../middleware/asyncWrapper';
import * as AuthController from '../Controllers/Auth.controller';
import validateRequestMiddleware from '../../../../middleware/validateRequest';
import LoginSchemas from '../../../../validators/Auth.validators';
import JwtMiddleware from '../../../../middleware/jwtMiddleware';
const createRouter = (): express.Router => {
    const router = express.Router();

    router.post(
        '/login',
        asyncWrapper(validateRequestMiddleware(LoginSchemas.LoginSchema)),
        asyncWrapper(AuthController.login)
    );

    router.post(
        '/refresh-token',
        asyncWrapper(
            validateRequestMiddleware(LoginSchemas.RefreshTokenSchema)
        ),
        JwtMiddleware.verifyRefreshToken,
        asyncWrapper(AuthController.refreshToken)
    );

    return router;
};

export default createRouter;
