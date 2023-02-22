import React, { memo, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { DeleteLocationModal } from 'Components/RocketScan';

import { useLocationsViewFunctions } from 'Context/Project/LocationsView';
import { deleteLocation, setLocationDeleted } from '../actions';
import { locationDeletedSelector } from '../selectors';

const DeleteLocationModalContainer = () => {
  const dispatch = useDispatch();

  const { currentLocationInfo, isOpenDeleteLocationModal, setIsOpenDeleteLocationModal }: any =
    useLocationsViewFunctions();

  const locationDeleted = useSelector(locationDeletedSelector, areEqual);

  const [confirmationString, setConfirmationString] = useState('');

  const onCloseClick = useCallback(() => {
    setIsOpenDeleteLocationModal(false);
    setConfirmationString('');
  }, []);

  const onDeleteClick = useCallback(
    (e: any) => {
      e.preventDefault();
      if (currentLocationInfo) {
        dispatch(deleteLocation(currentLocationInfo.locationId));
      }
    },
    [currentLocationInfo]
  );

  // close and reset modal when location is deleted
  useEffect(() => {
    if (locationDeleted) {
      setIsOpenDeleteLocationModal(false);
      dispatch(setLocationDeleted(false));
      setConfirmationString('');
    }
  }, [locationDeleted]);

  const onChangeConfirmationString = useCallback((e: any) => {
    const { value } = e.target;

    setConfirmationString(value);
  }, []);

  return (
    <DeleteLocationModal
      isOpen={isOpenDeleteLocationModal}
      confirmationString={confirmationString}
      currentLocationInfo={currentLocationInfo}
      onChangeConfirmationString={onChangeConfirmationString}
      onCloseClick={onCloseClick}
      onDeleteClick={onDeleteClick}
    />
  );
};

const DeleteLocationModalContainerMemo = memo(DeleteLocationModalContainer, areEqual);

export { DeleteLocationModalContainerMemo as DeleteLocationModal };
