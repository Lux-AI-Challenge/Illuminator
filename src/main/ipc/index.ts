import { ipcMain } from 'electron';
import Store from 'electron-store';
import { setupDimensions } from './dimensions/index';
// setup dimensions

const store = new Store();
setupDimensions(store);

// IPC listener
ipcMain.on('electron-store-get', async (_event, val) => {
  store.get(val);
});
ipcMain.on('electron-store-set', async (_event, key, val) => {
  store.set(key, val);
});
