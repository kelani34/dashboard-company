import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Thumbnail } from 'Components/Thumbnail';

import { Icon } from 'Components/Icons';
import classes from './roomTileThumbnail.module.css';

interface Props {
  photoUrl: string;
  isRoomSelected: boolean;
}

const RoomTileThumbnail = ({ photoUrl, isRoomSelected }: Props) => (
  <div className={`${classes.roomTileThumbnailBase} ${isRoomSelected ? classes.isRoomSelected : ''}`}>
    <Thumbnail imgClassName={classes.thumbnail} thumbnailSrcUrl={photoUrl} />
    <span className={classes.overlay} />
    <div className={classes.bottomIcons}>
      {isRoomSelected && <Icon className={classes.photoBookmark} type="confirmpurple" />}
    </div>
  </div>
);

const RoomTileThumbnailMemo = memo(RoomTileThumbnail, areEqual);

export { RoomTileThumbnailMemo as RoomTileThumbnail };
