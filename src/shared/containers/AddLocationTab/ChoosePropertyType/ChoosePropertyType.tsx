import React, { memo } from "react";

import { Icon } from "Components/Icons";
import { ImageTile } from "Containers/ImageTile";
import { areEqual } from "Utils/equalityChecks";

import classes from "./choosePropertyType.module.css";

interface Props {
  onSingleUnitTileClick: () => void;
  onMultiUnitTileClick: () => void;
}

const ChoosePropertyType = ({ onSingleUnitTileClick, onMultiUnitTileClick }: Props) => (
  <div className={classes.addLocationsWrapper}>
    <h1 className={classes.addLocationsTitle}>This Property Is...</h1>
    <div className={`d-flex justify-content-center align-items-center ${classes.addLocationsContent}`}>
      <ImageTile caption="Single Unit" onTileClick={onSingleUnitTileClick} icon={<Icon type="singleHome" />} />
      <ImageTile caption="Multi Unit" onTileClick={onMultiUnitTileClick} icon={<Icon type="highrise" />} />
    </div>
  </div>
);

const ChoosePropertyTypeMemo = memo(ChoosePropertyType, areEqual);

export { ChoosePropertyTypeMemo as ChoosePropertyType };
