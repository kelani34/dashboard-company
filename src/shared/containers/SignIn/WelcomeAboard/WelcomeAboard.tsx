import React, { memo, useEffect } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { WelcomeAboard } from 'Components/SignIn/WelcomeAboard';
import { useUser } from 'Context/User';
import { useDispatch } from 'react-redux';
import { userDetails } from 'Containers/User';

const WelcomeAboardContainer = () => {
  const dispatch = useDispatch();
  const user = useUser();

  // fetch user details to see if the user has a session and is approved. if yes user will be redirected to dashboard automatically
  useEffect(() => {
    if (!user?.id) {
      dispatch(userDetails());
    }
  }, [user]);

  return <WelcomeAboard />;
};

const WelcomeAboardContainerMemo = memo(WelcomeAboardContainer, areEqual);

export { WelcomeAboardContainerMemo as WelcomeAboard };
