/* eslint import/prefer-default-export: off, import/no-mutable-exports: off */
import { IpcMain } from 'electron';
import { Dimension } from 'dimensions-ai-temp/lib/main/Dimension';

export const setupDimensions = (ipcMain: IpcMain) => {
  const dim = new Dimension();

  ipcMain.on('dim_makeEnv', async (event, arg) => {
    const env = await dim.makeEnv(arg);
    // const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    // console.log(msgTemplate(arg));
    console.log('MAKE ENV', env.environment);
    const data: EnvInfo = {
      name: env.name ?? '',
      id: env.id,
    };

    event.reply('dim_makeEnv', data);
  });
};
