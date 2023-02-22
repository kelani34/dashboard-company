import React, { memo } from "react";
import { areEqual } from "Utils/equalityChecks";

import { Thumbnail } from "Containers/Thumbnail";

import classes from "./roomTile.module.css";

interface Props {
  roomName: string;
  photosCount: number;
  thumbnailSrcUrl?: string;
  onClick?: (e: any) => void;
}

const RoomTile = ({ roomName, photosCount, thumbnailSrcUrl, onClick }: Props) => (
  <div
    className={`${classes.roomTileBase} ${photosCount > 0 ? "" : classes.noPhotosBorder}`}
    onClick={onClick}
    onKeyUp={onClick}
    role="button"
    tabIndex={0}
  >
    <div className={`${classes.roomTextWrapper} ${photosCount > 0 ? classes.hasImage : ""}`}>
      <span className={`${classes.roomName} ${photosCount > 0 ? "" : classes.noPhotosText}`}>{roomName}</span>
      <span className={`${classes.photosCount} ${photosCount > 0 ? "" : classes.noPhotosText}`}>
        {`${photosCount} Photos`}
      </span>
    </div>
    <div className={`${classes.roomThumbContainer}`}>
      {thumbnailSrcUrl && <Thumbnail className={classes.thumbnail} thumbnailSrcUrl={thumbnailSrcUrl} readonly />}
    </div>
  </div>
);

RoomTile.defaultProps = {
  onClick: undefined,
  thumbnailSrcUrl: undefined,
};

const RoomTileMemo = memo(RoomTile, areEqual);

export { RoomTileMemo as RoomTile };
