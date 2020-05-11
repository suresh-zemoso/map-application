module.exports = {
    setupFiles: ['./src/setupTests.js'],

    transform: { '^.+\\.js$': 'babel-jest' },

    modulePathIgnorePatterns: ['<rootDir>/build/'],

    transformIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/build/'
    ],
    moduleNameMapper: {
        '^config$': '<rootDir>/webpack.config.js',
        "\\.(css|jpg|png|svg|gif)$": "<rootDir>/__tests__/__mocks__/emptyModule.js"
    },
    testMatch: ['<rootDir>/src/**/*.test.js'],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/build/'
    ],

    watchPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/build/'
    ],

    timers: 'fake',
    clearMocks: true,
    resetMocks: false,

    // collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js'],
    // coverageDirectory: './build/cov',
    // coverageReporters: ['lcov'],
    // coverageThreshold: {
    //     global: {
    //         branches: 100,
    //         functions: 100,
    //         lines: 100,
    //         statements: 100
    //     }
    // }
};