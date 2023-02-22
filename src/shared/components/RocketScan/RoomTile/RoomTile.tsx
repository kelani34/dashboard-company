import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { RoomTileThumbnail } from 'Containers/RocketScan';
import { LoadingThumbnail } from 'Components/RocketScan/LoadingThumbnail';
import classes from './roomTile.module.css';

interface Props {
  roomName: string;
  photosCount: number;
  thumbnailSrcUrl?: string;
  onClick?: (e: any) => void;
  hasPendingAssemblies: boolean;
  isRoomSelected: boolean;
}

const RoomTile = React.forwardRef(
  (
    { roomName, photosCount, thumbnailSrcUrl, onClick, hasPendingAssemblies, isRoomSelected }: Props,
    roomTileRef: any
  ) => (
    <div
      ref={(ref) => {
        roomTileRef.current = ref;
      }}
      className={`${classes.roomTileBase} ${photosCount > 0 ? '' : classes.noPhotosBorder} `}
      onClick={onClick}
      onKeyUp={onClick}
      role="button"
      tabIndex={0}
    >
      {hasPendingAssemblies ? (
        <LoadingThumbnail />
      ) : (
        <>
          <div className={`${classes.roomTextWrapper} ${photosCount > 0 ? classes.hasImage : ''}`}>
            <span className={`${classes.roomName} ${photosCount > 0 ? '' : classes.noPhotosText}`}>
              {hasPendingAssemblies ? 'Loading' : roomName}
            </span>
            <span className={`${classes.photosCount} ${photosCount > 0 ? '' : classes.noPhotosText}`}>
              {`${photosCount} Photos`}
            </span>
          </div>
        </>
      )}
      {!hasPendingAssemblies && thumbnailSrcUrl && (
        <RoomTileThumbnail photoUrl={thumbnailSrcUrl} isRoomSelected={isRoomSelected} />
      )}
    </div>
  )
);

RoomTile.defaultProps = {
  onClick: undefined,
  thumbnailSrcUrl: undefined,
};

const RoomTileMemo = memo(RoomTile, areEqual);

export { RoomTileMemo as RoomTile };
