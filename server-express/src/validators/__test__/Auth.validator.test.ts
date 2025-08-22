import LoginSchemas from '../Auth.validators';
import cases from 'jest-in-case';

describe('Auth.validators', () => {
    cases(
        'Login.Schema: it should throw error if login request is invalid',
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
                schema: LoginSchemas.LoginSchema,
                user: {
                    username: '',
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
                name: 'Invalid password',
                schema: LoginSchemas.LoginSchema,
                user: {
                    username: 'validUsername',
                    password: '',
                },
                error: {
                    code: 'too_small',
                    exact: false,
                    inclusive: true,
                    message: 'Minimum length for password is 1',
                    minimum: 1,
                    path: ['body', 'password'],
                    type: 'string',
                },
            },
        ]
    );
    cases(
        'RefreshToken.Schema: it should throw error if refresh token request is invalid',
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
                name: 'Invalid refresh token',
                schema: LoginSchemas.RefreshTokenSchema,
                user: {
                    refreshToken: '',
                },
                error: {
                    code: 'too_small',
                    exact: false,
                    inclusive: true,
                    message: 'Provide refresh token',
                    minimum: 1,
                    path: ['body', 'refreshToken'],
                    type: 'string',
                },
            },
        ]
    );
});
