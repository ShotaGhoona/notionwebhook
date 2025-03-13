// jest.config.js

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    // "ts-jest" をプリセットにすることで TypeScript をコンパイル可能に
    preset: 'ts-jest',
    testEnvironment: 'node',
    
    // Jest が .ts / .tsx を解釈できるようにする設定
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    // テストファイルをどこから探すかなど、必要に応じて追記
    setupFiles: ['dotenv/config'],
  };
  