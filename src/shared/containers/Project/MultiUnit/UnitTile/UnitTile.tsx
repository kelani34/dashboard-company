import React, { memo, useCallback } from "react";

import { areEqual } from "Utils/equalityChecks";
import { Icon } from "Components/Icons";

import classes from "./unitTile.module.css";

interface Props {
  id: number;
  name?: string;
  onTileClick?: (e: any) => void;
}

const UnitTileContainer = ({ id, name, onTileClick }: Props) => {
  const onClick = useCallback(() => {
    if (onTileClick) onTileClick({ id, name });
  }, []);

  return (
    <button className={classes.unitTileCard} onClick={onClick}>
      <div className={classes.iconImage}>
        <Icon type="unit" />
      </div>
      <h2 className={classes.imageCaption}>{name}</h2>
    </button>
  );
};

UnitTileContainer.defaultProps = {
  name: undefined,
  onTileClick: undefined,
};

const UnitTileContainerMemo = memo(UnitTileContainer, areEqual);

export { UnitTileContainerMemo as UnitTile };
