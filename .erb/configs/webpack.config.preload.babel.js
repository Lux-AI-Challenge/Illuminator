/**
 * Webpack config for production electron main process
 */

import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths.js';
import deleteSourceMaps from '../scripts/delete-source-maps';

deleteSourceMaps();

const devtoolsConfig =
  process.env.NODE_ENV === 'development'
    ? { devtool: false }
    : process.env.DEBUG_PROD === 'true'
    ? {
        devtool: 'source-map',
      }
    : {};
export default merge(baseConfig, {
  ...devtoolsConfig,
  mode: process.env.NODE_ENV,

  target: 'electron-main',

  entry: {
    preload: path.join(webpackPaths.srcMainPath, 'preload.ts'),
  },

  output: {
    path: webpackPaths.srcMainPath,
    filename: '[name].js',
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode:
        process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
      openAnalyzer: process.env.OPEN_ANALYZER === 'true',
    }),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
      DEBUG_PROD: true,
      START_MINIMIZED: false,
    }),
  ],

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false,
  },
});
