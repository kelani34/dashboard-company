/* eslint-disable */
const path = require('path');
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-controls'],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    config.resolve.alias['/'] = path.resolve(__dirname, '../src/shared');
    config.resolve.alias['Assets'] = path.resolve(__dirname, '../src/shared/assets');
    config.resolve.alias['Components'] = path.resolve(__dirname, '../src/shared/components');
    config.resolve.alias['Containers'] = path.resolve(__dirname, '../src/shared/containers');
    config.resolve.alias['Context'] = path.resolve(__dirname, '../src/shared/context');
    config.resolve.alias['HOC'] = path.resolve(__dirname, '../src/shared/hoc');
    config.resolve.alias['Utils'] = path.resolve(__dirname, '../src/shared/utils');
    config.resolve.alias['Hooks'] = path.resolve(__dirname, '../src/shared/hooks');
    config.resolve.alias['Themes'] = path.resolve(__dirname, '../src/shared/themes');
    config.resolve.alias['Routes'] = path.resolve(__dirname, '../src/routes');
    //This fixed Storybook crashing all the time
    // config.cache = false;
    return config;
  },
  //This handles the error when importing svgs
  babel: async (options) => {
    options.plugins.push('babel-plugin-inline-react-svg');
    return options;
  },
};
