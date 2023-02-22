/* eslint-disable */
import { Redirect, Route } from 'react-router-dom';
import React from 'react';

export const RedirectRoute = ({ children, redirect = '/login', ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => (
        <Redirect
          to={{
            pathname: redirect,
            state: { from: location },
          }}
        />
      )}
    />
  );
};
