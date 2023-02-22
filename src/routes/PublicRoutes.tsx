import React, { memo } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { userVerificationsSelector } from 'Containers/User/selector';
import { getAppRedirectPathLocal } from 'Containers/Core/actions';

// list of URLs of signup flow, unverified users should be able to access these routes
const excludes = ['/phoneverificationcode', '/welcomeaboard', '/welcomeback'];

const PublicRoute = ({ exact, path, render }: any) => {
  const userVerifications = useSelector(userVerificationsSelector, areEqual);
  const appRedirectPath = getAppRedirectPathLocal();

  // if the user is authenticated we'll do the following
  if (userVerifications?.authenticated) {
    const { sms, company, approved, isNew } = userVerifications;
    // verified users with an approved company attached are redirected to the dashboard screen
    if (sms && company && approved) {
      return (
        <Route
          exact={exact}
          path={path}
          render={({ location }) => (
            <Redirect
              to={{
                pathname: appRedirectPath || '/dashboard',
                search: `${isNew ? '?ft=1' : ''}`,
                state: { from: location },
              }}
            />
          )}
        />
      );
    }

    // verified users that don't have a company attached are redirected to the signupuserinformation screen
    if (sms && !company) {
      if (path === '/signupuserinformation') {
        return <Route exact={exact} path={path} render={render} />;
      }

      return (
        <Route
          exact={exact}
          path={path}
          render={({ location }) => (
            <Redirect
              to={{
                pathname: '/signupuserinformation',
                state: { from: location },
              }}
            />
          )}
        />
      );
    }

    // verified users that are attached to a company, but aren't approved yet are redirected to the blocked screen
    if (sms && company && !approved) {
      if (path === '/welcomeback') {
        return <Route exact={exact} path={path} render={render} />;
      }

      return (
        <Route
          exact={exact}
          path={path}
          render={({ location }) => (
            <Redirect
              to={{
                pathname: '/welcomeback',
                state: { from: location },
              }}
            />
          )}
        />
      );
    }

    // unverified users will always be redirected to the phone verification page
    if (!sms && !excludes.includes(path)) {
      // if the path is `phoneverification` we'll return the route otherwise trigger a redirect
      // this is to prevent infinite redirection on this path
      if (path === '/phoneverification') {
        return <Route exact={exact} path={path} render={render} />;
      }

      return (
        <Route
          exact={exact}
          path={path}
          render={({ location }) => (
            <Redirect
              to={{
                pathname: '/phoneverification',
                state: { from: location },
              }}
            />
          )}
        />
      );
    }
  }

  // public default route
  return <Route exact={exact} path={path} render={render} />;
};

const PublicRouteMemo = memo(PublicRoute, areEqual);

export { PublicRouteMemo as PublicRoute };
