import prisma from '../src/prismaClient';
import * as bcrypt from 'bcrypt';

const createRoles = async (): Promise<void> => {
    await prisma.role.createMany({
        data: [
            {
                name: 'admin',
            },
            {
                name: 'user',
            },
        ],
    });
};

const createUsers = async (): Promise<void> => {
    const adminRole = await prisma.role.findFirstOrThrow({
        where: { name: 'admin' },
    });
    const userRole = await prisma.role.findFirstOrThrow({
        where: { name: 'user' },
    });

    await prisma.user.createMany({
        data: [
            {
                username: 'admin',
                email: 'admin@example.com',
                password: await bcrypt.hash('admin123!23', 10),
                roleId: adminRole.id,
            },
            {
                username: 'user',
                email: 'user@example.com',
                password: await bcrypt.hash('user123!23', 10),
                roleId: userRole.id,
            },
        ],
    });
};

const main = async (): Promise<void> => {
    try {
        await createRoles();
        await createUsers();
    } catch (e) {
        console.error(e);
    }
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async () => {
        await prisma.$disconnect();
        process.exit(1);
    });
