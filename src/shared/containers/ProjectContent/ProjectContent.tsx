import React, { memo, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PurpleButton } from 'Components/Button';
import { RoomGallery } from 'Containers/RoomGallery';
import { areEqual } from 'Utils/equalityChecks';
import { CreateRoom } from 'Components/Rooms/CreateRoom';
import { LocationsPlaceholder } from 'Containers/LocationsPlaceholder/LocationsPlaceholder';
import { RoomButton } from 'Containers/RoomButton';
import { floorRoomsSelector, selectedFloorSelector } from 'Containers/Project/Floor/selectors';
import { createFloorRoom } from 'Containers/Project/Floor/actions';
import { setRoomCreated } from 'Containers/Project/Unit/actions';
import { PhotoErrorToast } from 'Containers/PhotoErrorToast';

import { roomCreatedSelector } from 'Containers/Project/Unit/selector';
import { projectIdSelector } from 'Containers/Project/selectors';
import { roomLevelUpdatedSelector } from 'Containers/Project/Unit/Rooms/selectors';
import { setRoomLevelUpdate, updateRoomLevel } from 'Containers/Project/Unit/Rooms/actions';
import { defaultLevelSelector } from 'Containers/RocketScan/RoomsView/RoomContent/LevelSelector/selectors';
import classes from './projectContent.module.css';
import { listRoomTypes } from './actions';
import { createRoom as createNewRoom, setSelectedRoomId } from '../Projects/actions';

const RoomSelector = ({ projectRooms }) => projectRooms.roomTypes;
const fetchingSelector = ({ core: { fetching: value } }: any) => value;

const contentTypes = {
  unit: 'unit',
  floor: 'floor',
};

const ProjectSelector = ({
  projects: { selectedProjectId, selectedUnitId, selectedFloorId, selectedPropertyId, setSelectedRoomId, myProjects },
}) => {
  // Get the selected Unit Rooms
  let rooms = []; // passback a default empty array in case the selectedPropertyId is 99;
  let type = '';
  if (selectedPropertyId) {
    const project = myProjects.data.find((project: any) => project.id.toString() === selectedProjectId);
    const property = project?.propertyIds[selectedPropertyId];
    // property is undefined here for some reason
    if (selectedFloorId) {
      const floor = property?.floors[selectedFloorId];
      rooms = floor?.rooms;
      type = contentTypes.floor;
    } else {
      const unit = property?.units[selectedUnitId];
      rooms = unit?.rooms;
      type = contentTypes.unit;
    }
  }
  return {
    selectedUnitId,
    selectedFloorId,
    setSelectedRoomId,
    type,
    rooms,
  };
};

const ProjectContentContainer = () => {
  const dispatch = useDispatch();

  const roomTypesList = useSelector(RoomSelector, areEqual);
  const fetching = useSelector(fetchingSelector, areEqual);
  const floor = useSelector(selectedFloorSelector, areEqual);
  const floorRooms = useSelector(floorRoomsSelector, areEqual);
  const roomCreated = useSelector(roomCreatedSelector, areEqual);
  const projectId = useSelector(projectIdSelector, areEqual);
  const roomLevelUpdated = useSelector(roomLevelUpdatedSelector, areEqual);
  // const { selectedUnitId, setSelectedRoomId: roomId, rooms } = useSelector(ProjectSelector, areEqual);
  const { selectedUnitId, type, rooms } = useSelector(ProjectSelector, areEqual);
  const defaultLevel = useSelector(defaultLevelSelector, areEqual);

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    if (type === contentTypes.floor) {
      setRoomsList(floorRooms);
    } else if (type === contentTypes.unit) {
      setRoomsList(rooms);
    } else {
      setRoomsList([]);
    }
  }, [rooms, floorRooms, type]);

  useEffect(() => {
    if (isModalOpen) {
      setIsButtonDisable(true);
    }
  }, [isModalOpen]);

  const onCreateRoomButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();

      if (type === contentTypes.floor) {
        // create a room for floor
        dispatch(createFloorRoom(floor?.id, selectedRoom));
      } else {
        // create a room for unit
        dispatch(createNewRoom(selectedUnitId, selectedRoom));
      }

      // reset values
      setIsModalOpen(false);
      dispatch(setSelectedRoomId(''));
      setSelectedRoom({
        id: undefined,
        name: undefined,
      });
      // Need to generate buttons
    },
    [selectedUnitId, selectedRoom, floor]
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
    if (type === contentTypes.floor) {
      dispatch(listRoomTypes('floor'));
    } else {
      dispatch(listRoomTypes());
    }
  }, [type]);

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
    }

    // refresh data on room level changed
    if (roomLevelUpdated && projectId) {
      // dispatch(listProjectPropertiesWithUnits(projectId));
    }

    return () => {
      dispatch(setRoomCreated(undefined));
      dispatch(setRoomLevelUpdate(false));
    };
  }, [roomCreated, projectId, roomLevelUpdated, defaultLevel]);

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
            ? roomsList.map((room: any) => (
                <RoomButton key={room.id} id={room.id} iconType={room?.name} onClick={onRoomButtonClick} isActive>
                  {room?.name}
                </RoomButton>
              ))
            : null}
        </div>
      </div>
      <div className="col d-flex flex-column justify-content-start align-items-center">
        {/* All new rooms will show immediately upon being created */}
        {roomsList.length > 0 ? (
          roomsList.map(({ id, name, level }: any) => (
            <RoomGallery key={id} roomId={id} roomName={name} levelName={level?.name} />
          ))
        ) : (
          <LocationsPlaceholder heading="No rooms yet. Add a new room" isButtonVisible={false} svgItem={2} />
        )}
      </div>
      <PhotoErrorToast />
    </div>
  );
};

const ProjectContentContainerMemo = memo(ProjectContentContainer, areEqual);
export { ProjectContentContainerMemo as ProjectContent };
