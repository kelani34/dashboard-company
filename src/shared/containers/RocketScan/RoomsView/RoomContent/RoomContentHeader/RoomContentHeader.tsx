import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RoomIcon, Icon } from 'Components/Icons';
import { LevelSelector } from 'Containers/RocketScan/RoomsView/RoomContent/LevelSelector/LevelSelector';

import { PillBadge } from 'Components/PillBadge';

import { areEqual } from 'Utils/equalityChecks';

import { EditButton } from 'Components/Button/EditButton';
import { updateRoomLevel } from 'Containers/RocketScan/RoomsView/Rooms/actions';
import { propertySelector } from 'Containers/RocketScan/selectors';
import { SourceMarker } from 'Containers/SourceMarker';

import { useRoomsViewFunctions } from 'Context/Project/RoomsView';

import classes from './roomContentHeader.module.css';

interface Props {
  room: any;
  editable: boolean;
  onEditButtonClick: (e: any) => void;
}

const RoomContentHeaderContainer = ({ room, editable, onEditButtonClick }: Props) => {
  const dispatch = useDispatch();

  const property = useSelector(propertySelector, areEqual);

  const [isOpenSourceOptions, setIsOpenSourceOptions] = useState(false);
  const [isRoomSource, setIsRoomSource] = useState(false);

  const { setRoomInfo, setIsOpenDeleteRoomModal }: any = useRoomsViewFunctions();

  const {
    id: roomId,
    room_type: { name: roomName, type: roomType },
    level: { name: levelName },
    type_occurrence: typeOccurrence,
    is_source: isSource,
  } = room;

  useEffect(() => {
    setIsRoomSource(isSource);
  }, [room]);

  const onLevelChange = useCallback((e: any) => {
    e.preventDefault();
    const { id } = e.currentTarget;

    // dispatch update room
    dispatch(updateRoomLevel(roomId, id));
  }, []);

  const onCaretIconClick = useCallback((e: any) => {
    e.preventDefault();
    setIsOpenSourceOptions((prevState) => !prevState);
  }, []);

  const onDeleteIconClick = useCallback(
    (e: any) => {
      e.preventDefault();
      if (roomId) {
        setRoomInfo(roomId, roomName, levelName);
        setIsOpenDeleteRoomModal(true);
      }
    },
    [roomId, roomName, levelName]
  );

  return (
    <div>
      <div className={`container-fluid d-flex flex-row justify-content-between px-0 py-2 ${classes.headerWrapper}`}>
        <div className={`d-flex flex-row ${classes.headerTitle}`}>
          <RoomIcon type={roomName} />
          <h2 className={classes.roomName}>{`${roomName} ${typeOccurrence !== 1 ? typeOccurrence : ''}`}</h2>
          {isRoomSource && <PillBadge className={classes.sourcePillBadge} text="Source" />}
          <Icon
            className={classes.caretIcon}
            type={!isOpenSourceOptions ? 'caretdown' : 'caretup'}
            onClick={onCaretIconClick}
          />
          {editable && property?.name !== 'singlelocation' && (
            <Icon className={classes.deleteIcon} type="trashsm" onClick={onDeleteIconClick} />
          )}
        </div>
        <div
          className={`d-flex flex-row justify-content-end position-relative ${classes.headerMenu} ${
            editable ? classes.addHeight : ''
          }`}
        >
          {editable && property?.name !== 'singlelocation' && (
            <LevelSelector
              defaultSelectedItem={levelName}
              defaultAccordionCollapse
              roomType={roomType}
              accordionId={`${roomId}-accordion`}
              levelMenuHeading={`${roomId}-heading`}
              levelOptions={`${roomId}-options`}
              onLevelChange={onLevelChange}
            />
          )}

          <EditButton editable={editable} onClick={onEditButtonClick} />
        </div>
      </div>
      {isOpenSourceOptions && <SourceMarker roomId={roomId} roomIsSource={isRoomSource} />}
    </div>
  );
};

const RoomContentHeaderContainerMemo = memo(RoomContentHeaderContainer, areEqual);

export { RoomContentHeaderContainerMemo as RoomContentHeader };
