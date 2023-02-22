import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useDispatch, useSelector } from 'react-redux';
import { PurpleButton } from 'Components/Button';
import { CreateRoom } from 'Components/RocketScan';
import { useHistory } from 'react-router-dom';

import {
  projectSelector,
  defaultExteriorLevelIdSelector,
  propertySelector,
  singleUnitExteriorRoomTypesSelector,
  multiUnitExteriorRoomTypesSelector,
  exteriorRoomTypesSelector,
} from 'Containers/RocketScan/selectors';
import {
  createLocationRoom,
  setLocation,
  setLocationRoomCreated,
} from 'Containers/RocketScan/MultiUnit/Locations/actions';
import {
  fetchingLocationRoomsSelector,
  locationRoomCreatedSelector,
} from 'Containers/RocketScan/MultiUnit/Locations/selectors';

import { createRoom, setRoomCreated } from 'Containers/RocketScan/RoomsView/Rooms/actions';
import { roomCreatedSelector } from 'Containers/RocketScan/RoomsView/Rooms/selectors';

import { selectPhotosModeSelector } from 'Containers/RocketScan/Header/ActionsCenter/selectors';

import classes from './addExterior.module.css';

interface Props {
  location: any;
  locationId: number;
  fromLocation?: boolean;
}

const AddExteriorContainer = ({ location, locationId, fromLocation }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // variables
  const [roomTypes, setRoomTypes] = useState([]);
  const locationRoomCreated = useSelector(locationRoomCreatedSelector, areEqual); // this is to redirect from locations view to rooms view
  const roomCreated = useSelector(roomCreatedSelector, areEqual); // this is to refresh rooms in rooms view
  const [selectedRoomTypeId, setSetSelectedRoomTypeId] = useState(null);
  const [isOpenCreateRoom, setIsOpenCreateRoom] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [createRoomButtonDisable, setCreateRoomButtonDisable] = useState(true);

  // selectors
  const project = useSelector(projectSelector, areEqual);
  const defaultExteriorLevelId = useSelector(defaultExteriorLevelIdSelector, areEqual);
  const property = useSelector(propertySelector, areEqual);
  const singleUnitExteriorRoomTypes = useSelector(singleUnitExteriorRoomTypesSelector, areEqual);
  const multiUnitExteriorRoomTypes = useSelector(multiUnitExteriorRoomTypesSelector, areEqual);
  const exteriorRoomTypes = useSelector(exteriorRoomTypesSelector, areEqual);
  const fetching = useSelector(fetchingLocationRoomsSelector, areEqual);
  const isSelectingPhotoMode = useSelector(selectPhotosModeSelector, areEqual);

  // default to exterior type
  useEffect(() => {
    if (property?.name === 'multiunit' && multiUnitExteriorRoomTypes.length > 0) {
      setRoomTypes(multiUnitExteriorRoomTypes);
    } else if (property?.name === 'singleunit' && singleUnitExteriorRoomTypes.length > 0) {
      setRoomTypes(singleUnitExteriorRoomTypes);
    } else if (property?.name === 'exterior' && exteriorRoomTypes.length > 0) {
      setRoomTypes(exteriorRoomTypes);
    }
  }, [property, singleUnitExteriorRoomTypes, multiUnitExteriorRoomTypes, exteriorRoomTypes]);

  // enable select room modal
  const onClickAddExteriorRoom = useCallback(() => {
    setCreateRoomButtonDisable(true);
    setIsOpenCreateRoom(true);
  }, []);

  // api call to create a new room
  const onCreateRoomButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();
      const locationLocalId = locationId || location.id;
      if (fromLocation) {
        dispatch(createLocationRoom(locationLocalId, selectedRoomTypeId, defaultExteriorLevelId));
      } else {
        dispatch(createRoom(locationLocalId, selectedRoomTypeId, defaultExteriorLevelId));
      }
    },
    [location, selectedRoomTypeId, defaultExteriorLevelId, locationId, fromLocation]
  );

  // set selected room type
  const onSelectRoomType = useCallback((id: number) => {
    setSetSelectedRoomTypeId(id);
    setCreateRoomButtonDisable(false);
  }, []);

  // close the modal
  const onClickRoomCreateClose = useCallback((e: any) => {
    e.preventDefault();

    setIsOpenCreateRoom(false);
  }, []);

  // close the modal room created on both views
  useEffect(() => {
    if (locationRoomCreated) {
      setIsOpenCreateRoom(false);
      setRedirect(true);
    }
  }, [locationRoomCreated]);

  useEffect(() => {
    if (roomCreated) {
      setIsOpenCreateRoom(false);
      dispatch(setRoomCreated(false));
    }
  }, [roomCreated]);

  // redirects you to the unit/floor/rooms view
  useEffect(() => {
    if (locationRoomCreated && redirect && fromLocation && locationId) {
      // if fromLocation passed from multiunit locations, this will refresh the relevant location rooms api
      const { id: projectId } = project;

      dispatch(setLocation(location));
      dispatch(setLocationRoomCreated(false));
      history.push(`/projects/${projectId}/rocketscan/multiunit/${locationId}`);
    }
  }, [locationRoomCreated, redirect]);

  return (
    <div className={classes.addRoomBase}>
      <PurpleButton
        onClick={onClickAddExteriorRoom}
        disabled={isSelectingPhotoMode}
        className={isSelectingPhotoMode ? classes.buttonDisabled : ''}
      >
        Add Exterior +
      </PurpleButton>
      <CreateRoom
        id={locationId}
        location={location}
        isExterior
        isOpen={isOpenCreateRoom}
        isButtonDisable={createRoomButtonDisable}
        roomTypes={roomTypes}
        fetching={fetching}
        onButtonClick={onCreateRoomButtonClick}
        onSelectItem={onSelectRoomType}
        modalCloseClick={onClickRoomCreateClose}
      />
    </div>
  );
};

AddExteriorContainer.defaultProps = {
  fromLocation: false,
};

const AddExteriorContainerMemo = memo(AddExteriorContainer, areEqual);

export { AddExteriorContainerMemo as AddExterior };
