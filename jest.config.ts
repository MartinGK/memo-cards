import type { Config } from "jest";

const config: Config = {
  verbose: true,
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.ts"]
};

export default config;
