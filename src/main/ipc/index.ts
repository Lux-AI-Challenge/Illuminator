import { app, ipcMain } from 'electron';
import ElectronStore from 'electron-store';
import { setupSystem } from './system';
import { setupDimensions } from './dimensions/index';
import { setupUser } from './user';
// import path from 'path';
const store = new ElectronStore() as Store;
// app.setPath(
//   'userData',
//   // path.join(app.getPath('userData'), '../LuxAIIlluminator')
//   path.join(__dirname, '../LuxAIIlluminator')
// );
// store.set('unicorn', '🦄');
console.log(store.get('unicorn'));
// setup dimensions
setupDimensions(store);
setupUser(store);
setupSystem(store);

// IPC listener
ipcMain.on('electron-store-get', async (_event, val) => {
  store.get(val);
});
ipcMain.on('electron-store-set', async (_event, key, val) => {
  store.set(key, val);
});
