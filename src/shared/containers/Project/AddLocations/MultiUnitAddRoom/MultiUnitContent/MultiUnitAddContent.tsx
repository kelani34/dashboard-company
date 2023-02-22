import React, { memo, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PurpleButton } from 'Components/Button';
import { areEqual } from 'Utils/equalityChecks';
import { CreateRoom } from 'Components/Rooms/CreateRoom';
import { LocationsPlaceholder } from 'Containers/LocationsPlaceholder/LocationsPlaceholder';
import { RoomButton } from 'Containers/RoomButton';
import { createFloorRoom } from 'Containers/Project/Floor/actions';
import { setRoomCreated, setUnitRoomsWithPhotos } from 'Containers/Project/Unit/actions';

import { listProjectPropertiesWithUnits } from 'Containers/Project/actions';
import { roomCreatedSelector, selectedMultiUnitSelector } from 'Containers/Project/Unit/selector';
import { projectIdSelector } from 'Containers/Project/selectors';
import { roomLevelUpdatedSelector, selectedUnitRoomsSelector } from 'Containers/Project/Unit/Rooms/selectors';
import { setRoomLevelUpdate, updateRoomLevel } from 'Containers/Project/Unit/Rooms/actions';
import { listRoomTypes } from 'Containers/ProjectContent/actions';
import { createRoom as createNewRoom, setSelectedRoomId } from 'Containers/Projects/actions';
import { MultiUnitRoomGallery } from 'Containers/Project/AddLocations/MultiUnitAddRoom';

import { defaultLevelSelector } from 'Containers/RocketScan/RoomsView/RoomContent/LevelSelector/selectors';
import classes from './multiUnitContent.module.css';

const RoomSelector = ({ projectRooms }) => projectRooms.roomTypes;
const fetchingSelector = ({ core: { fetching: value } }: any) => value;

const contentTypes = {
  unit: 'unit',
  floor: 'floor',
};

const MultiUnitAddContentContainer = () => {
  const dispatch = useDispatch();

  const roomTypesList = useSelector(RoomSelector, areEqual);
  const fetching = useSelector(fetchingSelector, areEqual);
  const unitRooms = useSelector(selectedUnitRoomsSelector, areEqual);
  const roomCreated = useSelector(roomCreatedSelector, areEqual);
  const projectId = useSelector(projectIdSelector, areEqual);
  // const { selectedUnitId, setSelectedRoomId: roomId, rooms } = useSelector(ProjectSelector, areEqual);
  const selectedMultiUnit: any = useSelector(selectedMultiUnitSelector, areEqual);
  const roomLevelUpdated = useSelector(roomLevelUpdatedSelector, areEqual);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultLevel = useSelector(defaultLevelSelector, areEqual);

  const [roomsList, setRoomsList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({
    id: undefined,
    name: undefined,
  });

  const setModalStatus = useCallback(() => {
    setIsModalOpen((isModalOpen: boolean) => !isModalOpen);
  }, []);
  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const [roomTypes, setRoomTypes] = useState([]);

  // set rooms
  useEffect(() => {
    if (unitRooms?.length > 0) {
      setRoomsList(unitRooms);
    } else {
      setRoomsList([]);
    }
  }, [unitRooms]);

  useEffect(() => {
    if (isModalOpen) {
      setIsButtonDisable(true);
    }
  }, [isModalOpen]);

  const onCreateRoomButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();

      if (selectedMultiUnit?.type === contentTypes.floor) {
        // create a room for floor
        dispatch(createFloorRoom(selectedMultiUnit?.id, selectedRoom));
      } else {
        // create a room for unit
        dispatch(createNewRoom(selectedMultiUnit?.id, selectedRoom));
      }

      // reset values
      setIsModalOpen(false);
      dispatch(setSelectedRoomId(''));
      setSelectedRoom({
        id: undefined,
        name: undefined,
      });
    },
    [selectedMultiUnit, selectedRoom]
  );

  const onSelectRoomType = useCallback((e: any) => {
    e.preventDefault();
    // get the id of the selected item and send to the api
    // const {id, name} = e.currentTarget;
    const { id, innerText: name } = e.currentTarget;
    setSelectedRoom({
      id,
      name,
    });
    setIsButtonDisable(!id);
  }, []);

  useEffect(() => {
    if (selectedMultiUnit?.type === contentTypes.floor) {
      dispatch(listRoomTypes('floor'));
    } else {
      dispatch(listRoomTypes());
    }
  }, [selectedMultiUnit]);

  const onRoomButtonClick = useCallback((id: string) => {
    dispatch(setSelectedRoomId(id));
  }, []);

  useEffect(() => {
    if (roomTypesList.length > 0) {
      setRoomTypes(roomTypesList);
    } else {
      setRoomTypes([]);
    }
  }, [roomTypesList]);

  useEffect(() => {
    // refresh data on room create
    if (roomCreated && projectId) {
      // set default room level
      if (defaultLevel) {
        dispatch(updateRoomLevel(roomCreated, defaultLevel));
      }

      dispatch(listProjectPropertiesWithUnits(projectId));
      dispatch(setUnitRoomsWithPhotos(selectedMultiUnit.id));
    }

    // refresh data on room level changed
    if (roomLevelUpdated && projectId) {
      // dispatch(listProjectPropertiesWithUnits(projectId));
    }

    return () => {
      dispatch(setRoomCreated(undefined));
      dispatch(setRoomLevelUpdate(false));
    };
  }, [roomCreated, projectId, roomLevelUpdated, selectedMultiUnit, defaultLevel]);

  return (
    <div className={`container-fluid d-flex p-2 ${classes.contentArea}`}>
      <div
        className={`col-3 d-flex flex-column justify-content-start align-items-center border-end ${classes.buttonColumn}`}
      >
        <PurpleButton onClick={setModalStatus}>Add Room+</PurpleButton>
        <CreateRoom
          isOpen={isModalOpen}
          isButtonDisable={isButtonDisable}
          roomTypes={roomTypes}
          fetching={fetching}
          onButtonClick={onCreateRoomButtonClick}
          onSelectItem={onSelectRoomType}
        />
        {/* RoomButton container to show here after room type has been selected */}
        <div className={classes.buttonWidth}>
          {roomsList.length > 0
            ? roomsList.map(({ id, room_type: roomType }: any) => (
                <RoomButton key={`multi-${id}`} id={id} iconType={roomType.name} onClick={onRoomButtonClick} isActive>
                  {roomType.name}
                </RoomButton>
              ))
            : null}
        </div>
      </div>
      <div className="col d-flex flex-column justify-content-start align-items-center">
        {/* All new rooms will show immediately upon being created */}
        {roomsList.length > 0 ? (
          roomsList.map(({ id, room_type: roomType, level }: any) => (
            <MultiUnitRoomGallery key={`multi-${id}`} roomId={id} roomName={roomType.name} levelName={level?.name} />
          ))
        ) : (
          <LocationsPlaceholder heading="No rooms yet. Add a new room" isButtonVisible={false} svgItem={2} />
        )}
      </div>
    </div>
  );
};

const MultiUnitAddContentContainerMemo = memo(MultiUnitAddContentContainer, areEqual);

export { MultiUnitAddContentContainerMemo as MultiUnitAddContent };
