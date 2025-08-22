import { type User, type SelectedUser } from '@services/Admin/User.type';
import prisma from '../../prismaClient';
import {logger} from '../../config/logger';

const getAllUsers = async (): Promise<User[]> => {
    logger.info('Admin.service: getAllUsers called');
    const users = await prisma.user.findMany({
        select: { username: true, email: true, role: true },
    });

    return users.map((user: SelectedUser) => ({
        ...user,
        role: user.role.name,
    }));
};

const adminService = { getAllUsers };

export default adminService;
