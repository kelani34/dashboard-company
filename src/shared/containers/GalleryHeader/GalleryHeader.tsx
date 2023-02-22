import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from 'Components/Icons';
import { LevelSelector } from 'Containers/RocketScan/RoomsView/RoomContent/LevelSelector/LevelSelector';
import { updateRoomLevel } from 'Containers/Project/Unit/Rooms/actions';

import { areEqual } from 'Utils/equalityChecks';

import classes from './galleryHeader.module.css';

interface Props {
  roomName: string;
  roomId: number;
  levelName?: string;
}

// temporary user feedback during development
// const temporaryButtonAction = () => alert("Temporarily disabled for development");

const GalleryHeaderContainer = ({ roomName, roomId, levelName }: Props) => {
  const dispatch = useDispatch();

  const onLevelChange = useCallback((e: any) => {
    e.preventDefault();
    const { id } = e.currentTarget;

    // dispatch update room
    dispatch(updateRoomLevel(roomId, id));
  }, []);

  return (
    <div className={`container-fluid d-flex flex-row justify-content-start px-0 py-2 ${classes.headerWrapper}`}>
      <div className="col d-flex flex-row justify-content-start align-items-baseline">
        <div className={classes.imageWrapper}>
          <Icon type="kitchen" />
        </div>
        <h2 className={classes.roomName}>{roomName}</h2>
      </div>
      <div className="col d-flex flex-row justify-content-end align-items-center position-relative">
        <LevelSelector
          defaultSelectedItem={levelName}
          defaultAccordionCollapse
          accordionId={`${roomId}-accordion`}
          levelMenuHeading={`${roomId}-heading`}
          levelOptions={`${roomId}-options`}
          onLevelChange={onLevelChange}
        />
        {/* <Icon type="actionsdefault" onClick={temporaryButtonAction} /> */}
      </div>
    </div>
  );
};

GalleryHeaderContainer.defaultProps = {
  levelName: 'Main Level',
};

const GalleryHeaderContainerMemo = memo(GalleryHeaderContainer, areEqual);

export { GalleryHeaderContainerMemo as GalleryHeader };
