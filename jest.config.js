module.exports = {
  testEnvironment: "node",
  testMatch: [
    "**/cloudfunctions/**/__tests__/**/*.test.js",
    "**/tests/**/*.test.js"
  ],
  collectCoverageFrom: [
    "cloudfunctions/**/*.js",
    "!cloudfunctions/**/node_modules/**",
    "!cloudfunctions/**/__tests__/**"
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  setupFiles: ["./tests/setup.js"]
};
