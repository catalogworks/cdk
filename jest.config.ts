import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./'],
  // rootDir: './',
  moduleDirectories: ['node_modules'],
};
export default config;

// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   runner: '@codejedi365/jest-serial-runner',
//   moduleDirectories: ['node_modules', 'src'],
//   rootDir: './',
// };
