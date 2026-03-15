module.exports = [
  {
    ignores: [
      "node_modules/**",
      "miniprogram_npm/**"
    ]
  },
  {
    files: ["**/*.js"],
    linterOptions: {
      reportUnusedDisableDirectives: "off"
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "commonjs",
      globals: {
        // WeChat mini program globals
        App: "readonly",
        Page: "readonly",
        Component: "readonly",
        Behavior: "readonly",
        getApp: "readonly",
        getCurrentPages: "readonly",
        wx: "readonly",
        __wxConfig: "readonly",
        // Node/Jest globals used in cloud functions and tests
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        process: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearTimeout: "readonly",
        clearInterval: "readonly",
        jest: "readonly",
        describe: "readonly",
        test: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly"
      }
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-undef": "error",
      "no-await-in-loop": "warn",
      "no-console": "off"
    }
  }
];
