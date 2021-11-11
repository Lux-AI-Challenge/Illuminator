import { ipcMain } from 'electron';
import ElectronStore from 'electron-store';
import { setupDimensions } from './dimensions/index';
import { setupUser } from './user';

const store = new ElectronStore() as Store;

// setup dimensions
setupDimensions(store);
setupUser(store);

// IPC listener
ipcMain.on('electron-store-get', async (_event, val) => {
  store.get(val);
});
ipcMain.on('electron-store-set', async (_event, key, val) => {
  store.set(key, val);
});
