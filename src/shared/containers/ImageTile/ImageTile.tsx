import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import classes from './imageTile.module.css';

interface Props {
  caption?: string;
  icon?: ReactNode;
  sizeSmall?: boolean;
  onTileClick?: (e: any) => void;
}

const ImageTileContainer = ({ caption, icon, sizeSmall, onTileClick }: Props) => (
  <button className={`${classes.imageTileCard} ${sizeSmall ? classes.sizeSmall : ''}`} onClick={onTileClick}>
    <div className={classes.iconImage}>{icon}</div>
    <h2 className={classes.imageCaption}>{caption}</h2>
  </button>
);

ImageTileContainer.defaultProps = {
  caption: undefined,
  icon: undefined,
  sizeSmall: false,
  onTileClick: undefined,
};

const ImageTileContainerMemo = memo(ImageTileContainer, areEqual);

export { ImageTileContainerMemo as ImageTile };
