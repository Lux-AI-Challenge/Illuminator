/* eslint-disable */
import { makeEnv } from './actions/makeEnv';
import { closeEnv } from './actions/closeEnv';
import { runEpisode } from './actions/runEpisode';
import { runSingleEpisode } from './actions/runSingleEpisode';
import { initializeAgents } from './actions/initializeAgents';
import { envRegisterAgents } from './actions/envRegisterAgents';
import { envStep } from './actions/envStep';
import { createEpisode } from './actions/createEpisode';
import type { MainProcessApi } from '../types';

const DimensionsApi = {
  prefix: 'dim',
  actions: {
    makeEnv,
    closeEnv,
    runEpisode,
    runSingleEpisode,
    initializeAgents,
    envRegisterAgents,
    envStep,
    createEpisode,
  },
} as const;

export type Dimensions = typeof DimensionsApi;

export default DimensionsApi;

const typecheck = DimensionsApi as MainProcessApi; // should error if it doesn't conform
