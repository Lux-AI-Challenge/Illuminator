# IPC Handlers

Files here are for setting up all communication to and from the main process and renderer process.

Some important notes on typings used here.

String _messages_ are sent between the main and renderer processes to communicate.

The _main_ process _handles_ messages, while the _renderer_ process _invokes_ them.

## APIs

Domains of functions are namespaced under constant singleton `Api` objects conforming to the type

```js
{
  prefix: string;
  actions: {
    [action: string]: (context) => (IPCMainInvokeEvent, data) => Promise
  }
}
```

where each prefix is unique, and `actions` contains a list mapping `action` strings to functions. See `main/ipc/dimensions/dimensions.d.ts` as an example.

Each function takes a `context` object providing any additional relevant data needed, and returns a callback that can be passed into `ipcMain.invoke()`.

To add a new function, create a new file for it in `ipc/[api]/actions/myFunction.ts` and export it in `main/ipc/[api]/actions/index.ts`. In order to actually use the function, we will also need to register a handler and invoker for it (discussed later).

Messages take the form `${api_prefix}_${api_action}`.

New APIs should be registered to the IPC renderer typings in `typings/global.d.ts` as so.

```js
interface Window {
  electron: {
    ...
    user: Handlers<User>;
    ...
  };
}
```

They should then also have their function handlers and invokers registered.

## Handlers

Every handler is declared as follows

```js
handleFunc(api, action, ctx);
```

where `api` is the API we wish to interact with, `action` is the string describing the function to invoke in `api`, and `ctx` the context for the action. Subsequent parameters should be automatically typed based on the previous ones.

Register a handler for a function by calling `handleFunc` along the `main` program execution path, ideally as soon as possible. In general, try to register handlers for the same API in close proximity with each other.

## Invokers

Every invoker is declared as follows

```js
invokeFunc < Api, Action > (message, data);
```

where `message` is the string `${api_prefix}_${api_action}` the corresponding handler is listening to. Both `message` and `data` should be automatically typed.

Invokers are exposed in `main/preload.ts` as so.

```js
const handlers = {
  ...
  user: {
    getPreferences(data) {
      return invokeFunc <User, 'getPreferences'> ('user_getPreferences', data);
    }
  }
}
```
