const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
    preset: 'ts-jest',
    collectCoverage: true,
    displayName: 'Unit Tests',
    collectCoverageFrom: ['src/**/*.{js,ts}'],
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/prisma/',
        '/src/utils/tests/',
        '/src/prismaClient.ts',
        '/src/index.ts',
        '/src/app.ts',
        '/src/config/',
    ],
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    coverageDirectory: 'coverage',
    roots: ['<rootDir>'],
    modulePaths: [compilerOptions.baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/src/',
    }),
    setupFilesAfterEnv: ['<rootDir>/src/utils/tests/prisma.ts'],
};
