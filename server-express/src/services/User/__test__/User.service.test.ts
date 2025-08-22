import userService from '@services/User/User.service';
import { prismaMock } from '../../../utils/tests/prisma';
import {logger} from '../../../config/logger';
import { type User } from '@services/User/User.type';
import { type ExtendedError } from '../../../utils/error/error';

const user: User = {
    email: 'test@example.com',
    username: 'test',
    password: 'password',
};

jest.mock('bcrypt', () => ({
    ...jest.requireActual('bcrypt'),
    hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

describe('UserService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should throw an error if user already exists', async () => {
        jest.spyOn(logger, 'error').mockImplementation(jest.fn());

        // @ts-ignore we don't need to return entire user object
        prismaMock.user.findUnique.mockResolvedValue(user);

        try {
            await userService.register(user);
        } catch (e) {
            const err = e as ExtendedError;
            expect(err.message).toBe('Username or email has been taken');
            expect(err.statusCode).toBe(400);
            expect(logger.error).toHaveBeenCalledWith(
                'UserService.register: User already exists'
            );
        }
    });
    it('should throw an error while role is not found', async () => {
        jest.spyOn(logger, 'error').mockImplementation(jest.fn());

        // @ts-ignore we don't need to return entire user object
        prismaMock.user.findUnique.mockResolvedValue(null);

        prismaMock.role.findFirstOrThrow.mockRejectedValue(
            new Error('Role not found')
        );

        try {
            await userService.register(user);
        } catch (e) {
            const err = e as ExtendedError;
            expect(err.message).toBe('Role not found');
            expect(logger.error).toHaveBeenCalledWith(
                'UserService.register: Role not found'
            );
        }
    });
    it('should register user', async () => {
        jest.spyOn(prismaMock.role, 'create').mockImplementation(jest.fn());

        prismaMock.role.findFirstOrThrow.mockResolvedValue({
            id: 1,
            name: 'user',
        });

        await userService.register(user);

        expect(prismaMock.user.create).toHaveBeenCalledWith({
            data: {
                ...user,
                password: 'hashedPassword',
                roleId: 1,
            },
        });
    });
});
