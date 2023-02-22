import React, { memo, useCallback } from "react";

import { areEqual } from "Utils/equalityChecks";
import { Icon } from "Components/Icons";

import classes from "./floorTile.module.css";

interface Props {
  id: number;
  name?: string;
  onTileClick?: (e: any) => void;
}

const FloorTileContainer = ({ id, name, onTileClick }: Props) => {
  const onClick = useCallback(() => {
    if (onTileClick) onTileClick({ id, name });
  }, []);

  return (
    <button className={classes.unitTileCard} onClick={onClick}>
      <div className={classes.iconImage}>
        <Icon type="floor" />
      </div>
      <h2 className={classes.imageCaption}>{name}</h2>
    </button>
  );
};

FloorTileContainer.defaultProps = {
  name: undefined,
  onTileClick: undefined,
};

const FloorTileContainerMemo = memo(FloorTileContainer, areEqual);

export { FloorTileContainerMemo as FloorTile };
