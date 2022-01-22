import type { Context } from 'main/ipc/dimensions/context';

/**
 * Finds an available environment process to use. If none available, a new one is created
 * @param envstr
 * @param ctx
 * @returns
 */
export const getEnv = async (envstr: string, ctx: Context) => {
  let env = ctx.data.envs.get(envstr);
  if (env) {
    console.log('FREE ENV EXISTS ALREADY, REUSUING', env.id);
  } else {
    console.log('CREATING ENV', envstr);
    env = await ctx.dim.makeEnv(envstr);
    ctx.data.envs.set(envstr, env);
  }
  return env;
};
