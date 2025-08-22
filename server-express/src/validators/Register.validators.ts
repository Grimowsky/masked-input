import { z } from 'zod';

const UserRegisterSchema = z.object({
    body: z.object({
        username: z.string().min(1, 'Minimum length for username is 1'),
        email: z.string().email('Provide valid email'),
        password: z.string().min(5, 'Password minimum length is 5'),
    }),
});

const RegisterSchemas = { UserRegisterSchema };

export default RegisterSchemas;
