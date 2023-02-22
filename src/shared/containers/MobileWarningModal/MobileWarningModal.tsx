import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { mobileWarningModalShownSelector } from 'Containers/Dashboard/selector';

import { setMobileWarningModalShown } from 'Containers/Dashboard/actions';

import { areEqual } from 'Utils/equalityChecks';
import { MobileWarningModal } from 'Components/MobileWarningModal';

const MobileWarningModalContainer = () => {
  const dispatch = useDispatch();

  // display mobile warning modal when display size is smaller than 920 pixels (any smaller and RocketScan rooms screen won't fit)
  const [isMobile] = useState(window.innerWidth <= 920);

  const mobileWarningModalShown = useSelector(mobileWarningModalShownSelector, areEqual);

  // Modal should show only once. Closing the modal or using the continue anyways link will count as shown.
  const modalCloseClick = useCallback(() => {
    dispatch(setMobileWarningModalShown(true));
  }, []);

  return <MobileWarningModal isOpen={isMobile && !mobileWarningModalShown} modalCloseClick={modalCloseClick} />;
};

const MobileWarningModalContainerMemo = memo(MobileWarningModalContainer, areEqual);

export { MobileWarningModalContainerMemo as MobileWarningModalContainer };
