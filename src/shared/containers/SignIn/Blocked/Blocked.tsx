import React, { memo, useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useUser } from 'Context/User';

import { areEqual } from 'Utils/equalityChecks';

import { sendReactivationClick } from 'Containers/User/actions';

import { Blocked } from 'Components/SignIn';

const BlockedContainer = () => {
  const dispatch = useDispatch();
  const user = useUser();

  const [timeCounter, setTimeCounter] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeCounter(timeCounter + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeCounter]);

  const onReactivateButtonClick = useCallback(async () => {
    if (user?.id) {
      await dispatch(sendReactivationClick(user.id, timeCounter));
    }
  }, [timeCounter, user]);
  return <Blocked onButtonClick={onReactivateButtonClick} />;
};

const BlockedContainerMemo = memo(BlockedContainer, areEqual);

export { BlockedContainerMemo as Blocked };
