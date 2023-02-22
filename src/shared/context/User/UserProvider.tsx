import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { useSelector } from 'react-redux';
import { appInitialLoadingSelector } from 'Containers/Core/selectors';
import { Spinner } from 'Components/Spinner';
import { userProviderFunctions, UserContext } from '.';

// user provider
const UserProvider = ({ children }: any) => {
  const user = userProviderFunctions();

  const appInitialLoading = useSelector(appInitialLoadingSelector, areEqual);

  return (
    <>
      <Spinner loading={appInitialLoading} />
      {!appInitialLoading && <UserContext.Provider value={user}>{children}</UserContext.Provider>}
    </>
  );
};

const UserProviderMemo = memo(UserProvider, areEqual);

export { UserProviderMemo as UserProvider };
