/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['dist'],
    collectCoverageFrom: [
        'src/**/{!(index),}.ts',
    ],
    coveragePathIgnorePatterns: [
        '<rootDir>/src/libs',
        '<rootDir>/src/middleware',
        '<rootDir>/src/Server.ts',
    ],

};
