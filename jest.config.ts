/* eslint-disable */
export default {
    displayName: 'react-b',
    transform: {
        '^.+\\.[tj]sx?$': 'babel-jest',
        "^.+\\.js$": "babel-jest",
        "^.+\\.css$": "jest-transform-css",
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stub',
    },
    testEnvironment: "jsdom",
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/libs/react-b',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  };