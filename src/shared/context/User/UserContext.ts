import { createContext, useContext, useEffect, useState } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { useDispatch, useSelector } from 'react-redux';

// types
import { UserModel } from 'Containers/User/Models/UserModel';

import { userSelector } from 'Containers/User/selector';
import { userDetails } from 'Containers/User';
import { isCompanyAdmin } from 'Utils/roles';
import { setAppInitialLoading, setAppRedirectPathLocal } from 'Containers/Core/actions';
import { userFeatureFlags } from 'Containers/User/actions';
import { shouldGetAuth } from 'Utils/helpers';
import { pusherSelector } from 'Containers/Core/selectors';

// initializing the user context variables, functions
export const UserContext = createContext(<UserModel>{});

// set user context variables, functions
export const userProviderFunctions = () => {
  const dispatch = useDispatch();

  const pusher = useSelector(pusherSelector, areEqual);

  const userData: UserModel = useSelector(userSelector, areEqual);
  const [user, setUser] = useState(<UserModel>{});

  useEffect(() => {
    if (userData?.id) {
      // get user data
      const { roles } = userData;

      // set user for the app usage
      setUser({
        ...userData,
        isCompanyAdmin: isCompanyAdmin(roles),
      });

      // call user feature flags
      dispatch(userFeatureFlags());
    }
  }, [userData]);

  useEffect(() => {
    const {
      location: { pathname },
    } = window;

    if (pathname.length > 1 && !shouldGetAuth(pathname)) {
      setAppRedirectPathLocal(pathname);
    } else {
      setAppRedirectPathLocal('');
    }

    // only fetch user details on private pages
    if (!shouldGetAuth(pathname)) {
      dispatch(userDetails(true));
    } else {
      dispatch(setAppInitialLoading(false));
    }
  }, []);

  // refresh user on role changed
  useEffect(() => {
    if (userData?.id) {
      // user role changed event
      pusher
        ?.subscribe(`BroadcastUserRoleChangedEvent.User.${userData?.id}`)
        ?.bind('App\\Events\\BroadcastUserRoleChangedEvent', () => {
          dispatch(userDetails(true));
        });
    }

    return () => {
      pusher?.unsubscribe(`BroadcastUserRoleChangedEvent.User.${userData?.id}`);
    };
  }, [pusher, userData]);

  return Object.freeze(user);
};

// export the userContext so we can use user properties anywhere in the application
export const useUser = () => useContext(UserContext);
