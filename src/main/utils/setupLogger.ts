/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint no-console: "off" */

// configure console.log so that the messages go to renderer as well

import { BrowserWindow } from 'electron';

export default (window: BrowserWindow) => {
  const oldErrLog = console.error;
  const oldLog = console.log;
  console.error = (...data: any[]) => {
    oldErrLog('[main]', ...data);
    window.webContents.send('stderr', ...data);
  };
  console.log = (...data: any[]) => {
    oldLog('[main]', ...data);
    window.webContents.send('stdout', ...data);
  };
};
