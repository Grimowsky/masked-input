import adminService from '../Admin.service';
import { prismaMock } from '../../../utils/tests/prisma';

describe('AdminService', () => {
    it('should return all users', async () => {
        const users = [
            {
                name: 'Robert',
                email: 'test@example.com',
                role: { name: 'user' },
            },
        ];

        // @ts-ignore: prisma mock does not know about selects in user findMany methods
        prismaMock.user.findMany.mockResolvedValue(users);

        const result = await adminService.getAllUsers();
        expect(result).toEqual([
            {
                name: 'Robert',
                email: 'test@example.com',
                role: 'user',
            },
        ]);
    });
});
