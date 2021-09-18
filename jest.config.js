module.exports = {
  "testEnvironment": "jsdom",
  "moduleFileExtensions": [
    "js",
    "json",
    "vue",
  ],
  "transform": {
    // 用 `vue-jest` 处理 `*.vue` 文件
    ".*\\.(vue)$": "vue-jest",
    // 用 `babel-jest` 处理 js
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
  },
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^packages/(.*)$": "<rootDir>/packages/$1",
  },
  "timers": "fake",
  "collectCoverage": true,
  "coverageDirectory": "coverage",
  "collectCoverageFrom": [
    "packages/**/*.{vue}",
  ],
  coverageReporters: ['html', 'text'],
}
