import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.test.json",
      },
    ],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  fakeTimers: { enableGlobally: true },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./jest.setup.ts"],
};

export default config;
