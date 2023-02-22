import React from 'react';

import { Provider } from 'react-redux';
import { Routes } from 'Routes/Routes';

import { UserProvider } from 'Context/User';
import { CoreProvider } from 'Context/Core';

// Pull the mock data
import { setupStore } from '../store';
import './App.css';

// Create the store
const store = setupStore();

const App = () => (
  <Provider store={store}>
    <UserProvider>
      <CoreProvider>
        <Routes />
      </CoreProvider>
    </UserProvider>
  </Provider>
);
export default App;
