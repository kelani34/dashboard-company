import React, { memo } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';
import { userVerificationsSelector } from 'Containers/User/selector';

const PrivateRoute = ({ exact, path, render }: any) => {
  const userVerifications = useSelector(userVerificationsSelector, areEqual);
  const { authenticated, sms, company, approved } = userVerifications;

  // we'll redirect if the user:
  // is not authenticated,
  // doesn't has a company,
  // or company is not approved,
  if (!authenticated && !sms && !company && !approved) {
    return (
      <Route
        exact={exact}
        path={path}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )}
      />
    );
  }

  return <Route exact={exact} path={path} render={render} />;
};

const PrivateRouteMemo = memo(PrivateRoute, areEqual);

export { PrivateRouteMemo as PrivateRoute };
