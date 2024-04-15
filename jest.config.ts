/* eslint-disable */
export default {
    displayName: 'react-b',
    transform: {
        '^.+\\.[tj]sx?$': 'babel-jest',
        "^.+\\.js$": "babel-jest",
        "^.+\\.css$": "jest-transform-css",
    },
    testEnvironment: "jsdom",
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/libs/react-b',
  };