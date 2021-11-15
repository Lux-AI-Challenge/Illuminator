import path from 'path';
import { app, ipcMain } from 'electron';
import ElectronStore from 'electron-store';
import { setupSystem } from './system';
import { setupDimensions } from './dimensions';
import { setupUser } from './user';

app.setPath(
  'userData',
  path.join(app.getPath('userData'), '../LuxAI-Illuminator')
);
const store = new ElectronStore() as Store;

// setup dimensions
setupDimensions(store);
setupUser(store);
setupSystem(store);

// IPC listener
ipcMain.handle('electron-store-get', async (_event, val) => {
  return store.get(val);
});
ipcMain.handle('electron-store-set', async (_event, key, val) => {
  return store.set(key, val);
});
