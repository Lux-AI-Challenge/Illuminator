# IPC Handlers

Files here are for setting up all the IPC handlers for communication to and from the main process and renderer process.

Some important notes on typings used here.

Every handler is declared as follows

```
handleFunc<Namespace.Actions['GetPreferences']>('user_getPreferences', async (_event, data) => {
  return store.get('store_user_preferences');
});
```

Where `Namespace.Actions` is a globally defined interface. See `ipc/user/user.d.ts` as an example.

To add a new IPC handler, first create a new property e.g. `GetID` under a namespace e.g. `User` and the `Actions` interface

Then we write

```
declare namespace User {
  interface Actions {
    GetID: {
      in: void; // specify no input used
      out: string; // specify output of action is a string
    }
  }
}
```

If using a new namespace, we need to register it to the ipc renderer typings in typings/globa.d.ts as so.

```
interface Window {
  electron: {
    ...
    user: ExtractHandlers<User.Actions>;
    ...
  };
}
```

This is then populated in the main process typings and renderer process typings in addition to the `ipcRenderer` also registering this as well
