module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(scss|css|less)$': '<rootDir>/src/test/__mocks__/style.mock.js',
  },
};
