import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ADD_LOCATIONS, PHOTO_MANAGEMENT, MULTI_UNIT } from 'Utils/constants';

import { Icon } from 'Components/Icons';
import { ImageTile } from 'Containers/ImageTile';
import { UnitGallery } from 'Containers/UnitGallery';
import { areEqual } from 'Utils/equalityChecks';
import { CreateUnit } from 'Containers/Units/CreateUnit';
import { CreateFloor } from 'Containers/Units/CreateFloor';

import { multiUnitsSelector } from 'Containers/Project/Unit/selector';
import { floorRoomsWithPhotosSelector, floorWithRoomsSelector } from 'Containers/Project/Floor/selectors';
import { projectIdSelector, propertyMultiSelector } from 'Containers/Project/selectors';

import { setSelectedMultiUnit } from 'Containers/Project/Unit/actions';

import { unitRoomsWithPhotosSelector } from 'Containers/Project/Unit/Rooms/selectors';
import { setSelectedUnitRooms } from 'Containers/Project/Unit/Rooms/actions';
import classes from './multiUnitContent.module.css';

const MultiUnitContentContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [isFloorModalOpen, setIsFloorModalOpen] = useState(false);

  const units = useSelector(multiUnitsSelector, areEqual);
  const floors = useSelector(floorWithRoomsSelector, areEqual);
  const property = useSelector(propertyMultiSelector, areEqual);
  const projectId = useSelector(projectIdSelector, areEqual);
  const unitRooms = useSelector(unitRoomsWithPhotosSelector, areEqual);
  const floorRooms = useSelector(floorRoomsWithPhotosSelector, areEqual);

  const setUnitModalStatus = useCallback(() => {
    setIsUnitModalOpen((isModalOpen) => !isModalOpen);
  }, []);

  const setFloorModalStatus = useCallback(() => {
    setIsFloorModalOpen((isModalOpen) => !isModalOpen);
  }, []);

  const onUnitTileClick = useCallback(
    (unit: any) => {
      const unitRoom = unitRooms.find((unitRoom: any) => unitRoom.unitId === unit.id);

      if (unitRoom?.rooms.length > 0) {
        dispatch(setSelectedUnitRooms([]));
        dispatch(setSelectedUnitRooms(unitRoom.rooms));
      } else {
        dispatch(setSelectedUnitRooms([]));
      }

      dispatch(
        setSelectedMultiUnit({
          ...unit,
          type: 'unit',
        })
      );

      history.push(`/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}${MULTI_UNIT}/add`);
    },
    [property, projectId]
  );

  const onFloorTileClick = useCallback((floor: any) => {
    const floorRoom = floorRooms.find((floorRoom: any) => floorRoom.floorId === floor.id);

    if (floorRoom?.rooms.length > 0) {
      dispatch(setSelectedUnitRooms([]));
      dispatch(setSelectedUnitRooms(floorRoom.rooms));
    } else {
      dispatch(setSelectedUnitRooms([]));
    }

    dispatch(
      setSelectedMultiUnit({
        ...floor,
        type: 'floor',
      })
    );

    history.push(`/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}${MULTI_UNIT}/add`);
  }, []);

  return (
    <div className={`container-fluid d-flex p-2 ${classes.contentArea}`}>
      <div
        className={`col-3 d-flex flex-column justify-content-start align-items-start border-end ${classes.buttonColumn}`}
      >
        {/* Unit Buttons */}
        <div className={classes.buttonWidth}>
          <div>
            <ImageTile caption="Create Unit +" onTileClick={setUnitModalStatus} icon={<Icon type="unit" />} />
            <CreateUnit isOpen={isUnitModalOpen} />
          </div>
          <div className={classes.buttonSpacing}>
            <ImageTile
              caption="Create Floor / Common Areas +"
              onTileClick={setFloorModalStatus}
              icon={<Icon type="floor" />}
            />
            <CreateFloor isOpen={isFloorModalOpen} />
          </div>
        </div>
      </div>
      <div className={`col d-flex flex-column justify-content-start align-items-center ${classes.tabs}`}>
        <UnitGallery
          units={units}
          floors={floors}
          onUnitTileClick={onUnitTileClick}
          onFloorTileClick={onFloorTileClick}
        />
      </div>
    </div>
  );
};

const MultiUnitContentContainerMemo = memo(MultiUnitContentContainer, areEqual);

export { MultiUnitContentContainerMemo as MultiUnitContent };
