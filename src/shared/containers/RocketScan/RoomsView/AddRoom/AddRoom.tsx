import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useDispatch, useSelector } from 'react-redux';
import { PurpleButton } from 'Components/Button';
import { CreateRoom } from 'Components/RocketScan';
import { useHistory } from 'react-router-dom';

import {
  projectSelector,
  defaultRoomLevelIdSelector,
  floorRoomTypesSelector,
  propertySelector,
  unitRoomTypesSelector,
  commercialRoomTypesSelector,
  industrialRoomTypesSelector,
} from 'Containers/RocketScan/selectors';
import {
  createLocationRoom,
  setLocation,
  setLocationRoomCreated,
} from 'Containers/RocketScan/MultiUnit/Locations/actions';
import { locationRoomCreatedSelector } from 'Containers/RocketScan/MultiUnit/Locations/selectors';

import { listLocationRoomsForButtons } from 'Containers/RocketScan/RoomsView/RoomButtons/actions';
import { listRoomTypes } from 'Containers/RocketScan/actions';
import {
  customRoomCreatedSelector,
  customRoomDeletedSelector,
  customRoomUpdatedSelector,
} from 'Containers/RocketScan/RoomsView/CreateCustomRoom/selectors';
import {
  setCustomRoomCreated,
  setCustomRoomDeleted,
  setCustomRoomUpdated,
} from 'Containers/RocketScan/RoomsView/CreateCustomRoom/actions';
import { createRoom, setRoomCreated } from 'Containers/RocketScan/RoomsView/Rooms/actions';
import { roomCreatedSelector } from 'Containers/RocketScan/RoomsView/Rooms/selectors';
import { coreFetchingSelector } from 'Containers/Core/selectors';

import { selectPhotosModeSelector } from 'Containers/RocketScan/Header/ActionsCenter/selectors';

import classes from './addRoom.module.css';

interface Props {
  location: any;
  isCommercial?: boolean;
  fromLocation?: boolean;
}

const AddRoomContainer = ({ location, isCommercial, fromLocation }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    id: locationId,
    location_type: { name: locationType },
  } = location;

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
  const defaultRoomLevelId = useSelector(defaultRoomLevelIdSelector, areEqual);
  const property = useSelector(propertySelector, areEqual);
  const unitRoomTypes = useSelector(unitRoomTypesSelector, areEqual);
  const commercialRoomTypes = useSelector(commercialRoomTypesSelector, areEqual);
  const floorRoomTypes = useSelector(floorRoomTypesSelector, areEqual);
  const industrialRoomTypes = useSelector(industrialRoomTypesSelector, areEqual);
  const customRoomCreated = useSelector(customRoomCreatedSelector, areEqual);
  const customRoomUpdated = useSelector(customRoomUpdatedSelector, areEqual);
  const customRoomDeleted = useSelector(customRoomDeletedSelector, areEqual);
  const fetching = useSelector(coreFetchingSelector, areEqual);
  const isSelectingPhotoMode = useSelector(selectPhotosModeSelector, areEqual);

  // display commercial rooms if unit is commercial
  useEffect(() => {
    if (property?.id) {
      const { id: propertyId } = property;

      if (locationType.toLocaleLowerCase() === 'unit' && isCommercial) {
        const type = 'commercial';
        dispatch(listRoomTypes(propertyId, type));
      }
    }
  }, [property, isCommercial, locationType]);

  // set room types based on the locationType. unit or floor
  useEffect(() => {
    if (property?.id) {
      if (property.name === 'singleunit' || property.name === 'multiunit') {
        if (locationType.toLocaleLowerCase() === 'unit' && unitRoomTypes.length > 0 && !isCommercial) {
          setRoomTypes(unitRoomTypes);
        } else if (locationType.toLocaleLowerCase() === 'unit' && commercialRoomTypes.length > 0 && isCommercial) {
          setRoomTypes(commercialRoomTypes);
        } else if (locationType.toLocaleLowerCase() === 'floor' && floorRoomTypes.length > 0) {
          setRoomTypes(floorRoomTypes);
        }
      }
      if (property.name === 'commercial' && industrialRoomTypes.length > 0) {
        setRoomTypes(industrialRoomTypes);
      }
    }
  }, [property, unitRoomTypes, floorRoomTypes, commercialRoomTypes, industrialRoomTypes, locationType, isCommercial]);

  // enable select room modal
  const onClickAddRoom = useCallback(() => {
    setCreateRoomButtonDisable(true);
    setIsOpenCreateRoom(true);
  }, []);

  // api call to create a new room
  const onCreateRoomButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();
      const locationLocalId = locationId || location.id;
      if (fromLocation) {
        dispatch(createLocationRoom(locationLocalId, selectedRoomTypeId, defaultRoomLevelId));
        setRedirect(true);
      } else {
        dispatch(createRoom(locationLocalId, selectedRoomTypeId, defaultRoomLevelId));
      }
    },
    [location, selectedRoomTypeId, defaultRoomLevelId, locationId, fromLocation]
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

  // fetch room types when a custom room created, updated, and deleted
  useEffect(() => {
    if (customRoomCreated || customRoomUpdated || customRoomDeleted) {
      let type = locationType;

      if (!locationType) {
        const {
          location_type: { name },
        } = location;

        type = name;
      }

      dispatch(listRoomTypes(property.id, type));
      dispatch(setCustomRoomCreated(false));
      dispatch(setCustomRoomUpdated(false));
      dispatch(setCustomRoomDeleted(false));
    }
  }, [property, location, customRoomCreated, customRoomUpdated, customRoomDeleted]);

  // Refresh the room buttons once a room created
  useEffect(() => {
    if (roomCreated) {
      // only for single unit section
      let type = locationType;

      if (!locationType) {
        const {
          location_type: { name },
        } = location;

        type = name;
      }
      const locationLocalId = locationId || location.id;
      dispatch(listRoomTypes(property.id, type));
      dispatch(listLocationRoomsForButtons(locationLocalId));
    }
  }, [roomCreated, location]);

  // close the create room modal
  useEffect(() => {
    if (roomCreated) {
      setIsOpenCreateRoom(false);
      dispatch(setRoomCreated(false));
    }
  }, [roomCreated]);

  // if in locations view, redirects you to the unit/floor/rooms view of the newly created location
  useEffect(() => {
    if (locationRoomCreated && redirect && fromLocation && locationId) {
      // close create room modal
      setIsOpenCreateRoom(false);

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
        onClick={onClickAddRoom}
        disabled={isSelectingPhotoMode}
        className={isSelectingPhotoMode ? classes.buttonDisabled : ''}
      >
        Add Room +
      </PurpleButton>
      <CreateRoom
        id={locationId}
        location={location}
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

AddRoomContainer.defaultProps = {
  isCommercial: undefined,
  fromLocation: false,
};

const AddRoomContainerMemo = memo(AddRoomContainer, areEqual);

export { AddRoomContainerMemo as AddRoom };
