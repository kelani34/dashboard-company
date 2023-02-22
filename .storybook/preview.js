/*eslint-disable */
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import React from 'react';
import { Provider } from 'react-redux';

import { setupStore } from '../src/store';

//Use this to trigger responsive viewports
const customViewports = {
  'x-small': {
    name: 'x-small',
    styles: {
      width: '575px', //<576px
      height: '100vh',
    },
  },
  small: {
    name: 'small',
    styles: {
      width: '768px', //≥576px
      height: '100vh',
    },
  },
  medium: {
    name: 'medium',
    styles: {
      width: '992px', //≥768px
      height: '100vh',
    },
  },
  large: {
    name: 'large',
    styles: {
      width: '1199px', //≥992px
      height: '100vh',
    },
  },
  'x-large': {
    name: 'x-large',
    styles: {
      width: '1399px', //≥1200px
      height: '100vh',
    },
  },
  'xx-large': {
    name: 'xx-large',
    styles: {
      width: '100%', //≥1400px
      height: '100vh',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'centered',
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      ...customViewports,
    },
  },
};

export const decorators = [
  (Story) => (
    <Provider store={setupStore()}>
      <div className="container-fluid" style={{ height: 'auto' }}>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-center">
              <Story />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  ),
];
