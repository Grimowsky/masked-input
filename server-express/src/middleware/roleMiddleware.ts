import jwtMiddleware from './jwtMiddleware';
import { type Role } from '../common/types/roles.type';
import {
    type AppNext,
    type AppReq,
    type AppRes,
} from '../common/types/Request.type';

const roleMiddleware = (allowedRoles: Role[]) => {
    return async (
        req: AppReq,
        res: AppRes,
        next: AppNext
    ): Promise<AppRes | undefined> => {
        const header = req.headers.authorization;
        if (!header) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const token = header.split(' ')[1];
        const role = jwtMiddleware.decodeUserFromToken(token)?.data?.role;

        if (allowedRoles.includes(role)) {
            next();
        } else {
            return res.status(403).send({ message: 'Forbidden' });
        }
    };
};
export default roleMiddleware;
