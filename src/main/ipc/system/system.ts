/* eslint-disable @typescript-eslint/no-unused-vars */
import { fileSelect } from './actions/fileSelect';
import { getPythonInterpreters } from './actions/getPythonInterpreters';
import { readFile } from './actions/readFile';
import type { MainProcessApi } from '../types';

const SystemApi = {
  prefix: 'sys',
  actions: {
    fileSelect,
    getPythonInterpreters,
    readFile,
  },
} as const;

export type System = typeof SystemApi;

export default SystemApi;

const typecheck = SystemApi as MainProcessApi; // should error if it doesn't conform
