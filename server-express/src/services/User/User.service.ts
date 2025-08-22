import { type User } from '@services/User/User.type';
import { ExtendedError } from '../../utils/error/error';
import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcrypt';
import prisma from '../../prismaClient';
import {logger} from '../../config/logger';

const register = async (data: User): Promise<User> => {
    let role = null;
    const user =
        (await prisma.user.findUnique({ where: { email: data.email } })) ||
        (await prisma.user.findUnique({ where: { username: data.username } }));

    try {
        role = await prisma.role.findFirstOrThrow({
            where: { name: 'user' },
        });
    } catch (e) {
        logger.error('UserService.register: Role not found');
        throw ExtendedError.of(
            'Role not found',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }

    if (user) {
        logger.error('UserService.register: User already exists');
        throw ExtendedError.of(
            'Username or email has been taken',
            StatusCodes.BAD_REQUEST
        );
    }

    const userWithHashedPass: User = {
        ...data,
        password: await bcrypt.hash(data.password, 10),
    };

    return prisma.user.create({
        data: { ...userWithHashedPass, roleId: role.id },
    });
};

const userService = { register };

export default userService;
