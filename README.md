# Illuminator

An app that helps track your bots, evaluate them, and analyze them given an arbitrary AI environment.

## Development

yarn

External things to install.... for native packages (of which dimensions has for various reasons)

https://electron-react-boilerplate.js.org/docs/adding-dependencies/#module-structure

brew install cmake (fix some gyp problems)

yarn add node-loader --save-dev

externals / polyfill things

Note, stylesheets must be named \*.global.scss

Whenever a change is made to IPC, rebuild main

## faq...

make sure to update version before publishing!

windows wsl2 electron dev stuff:
https://gist.github.com/caseywatts/9700b402b6b51d1d6af9f0b206739770

## how to add new IPC actions

1. add it to ipc/{namespace}/actions/{name}.ts
2. add it preload.ts
3. add it to ipc/{namespace}/actions/index.ts
4. add it to ipc/{namespace}/index.ts
