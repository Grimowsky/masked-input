import RegisterSchemas from '../Register.validators';
import cases from 'jest-in-case';

describe('Register.validators', () => {
    cases(
        'it should throw error if request is invalid',
        async ({ schema, user, error }) => {
            try {
                await schema.parseAsync({
                    body: user,
                });
            } catch (e) {
                const err = e as any;
                expect(err.errors).toStrictEqual([error]);
            }
        },
        [
            {
                name: 'Invalid username',
                schema: RegisterSchemas.UserRegisterSchema,
                user: {
                    username: '',
                    email: 'test@example.com',
                    password: '12345',
                },
                error: {
                    code: 'too_small',
                    exact: false,
                    inclusive: true,
                    message: 'Minimum length for username is 1',
                    minimum: 1,
                    path: ['body', 'username'],
                    type: 'string',
                },
            },
            {
                name: 'Invalid email',
                schema: RegisterSchemas.UserRegisterSchema,
                user: {
                    username: 'validUsername',
                    email: 'invalidEmail',
                    password: '12345',
                },
                error: {
                    code: 'invalid_string',
                    message: 'Provide valid email',
                    path: ['body', 'email'],
                    validation: 'email',
                },
            },
            {
                name: 'Invalid password',
                schema: RegisterSchemas.UserRegisterSchema,
                user: {
                    username: 'validUsername',
                    email: 'test@example.com',
                    password: 'a123',
                },
                error: {
                    code: 'too_small',
                    exact: false,
                    inclusive: true,
                    message: 'Password minimum length is 5',
                    minimum: 5,
                    path: ['body', 'password'],
                    type: 'string',
                },
            },
        ]
    );
});
