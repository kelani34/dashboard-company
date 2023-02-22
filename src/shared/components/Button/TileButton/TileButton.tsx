import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Button } from '..';

import classes from './tileButton.module.css';

interface Props {
  caption?: string;
  icon?: ReactNode;
  sizeSmall?: boolean;
  className?: string;
  disabled?: boolean;
  onTileClick?: (e: any) => void;
}

const TileButtonContainer = ({ caption, icon, sizeSmall, className, disabled = false, onTileClick }: Props) => (
  <Button
    className={`${classes.imageTileCard} ${sizeSmall ? classes.sizeSmall : ''} ${className || ''}`}
    disabled={disabled}
    onClick={onTileClick}
  >
    <span className={classes.iconImage}>{icon}</span>
    <span className={`${classes.imageCaption} ${className}`}>{caption}</span>
  </Button>
);

TileButtonContainer.defaultProps = {
  caption: undefined,
  icon: undefined,
  sizeSmall: false,
  className: undefined,
  onTileClick: undefined,
  disabled: false,
};

const TileButtonContainerMemo = memo(TileButtonContainer, areEqual);

export { TileButtonContainerMemo as TileButton };
