import React, { memo } from 'react';

import { Icon } from 'Components/Icons';
import { TileButton } from 'Components/Button';
import { areEqual } from 'Utils/equalityChecks';

import classes from './choosePropertyType.module.css';

interface Props {
  onSingleUnitTileClick: () => void;
  onSingleLocationTileClick: () => void;
  onExteriorTileClick: () => void;
  onMultiUnitTileClick: () => void;
  onCommercialTileClick: () => void;
}

const ChoosePropertyType = ({
  onSingleUnitTileClick,
  onSingleLocationTileClick,
  onExteriorTileClick,
  onMultiUnitTileClick,
  onCommercialTileClick,
}: Props) => (
  <div className={classes.choosePropertyTypeBase}>
    <h6 className={classes.title}>This Project Is...</h6>
    <div className={`d-flex justify-content-center align-items-center flex-wrap ${classes.content}`}>
      <TileButton caption="Single Unit" onTileClick={onSingleUnitTileClick} icon={<Icon type="singleHome" />} />
      <TileButton caption="Multi Unit" onTileClick={onMultiUnitTileClick} icon={<Icon type="multiunit" />} />
      <TileButton caption="Exterior" onTileClick={onExteriorTileClick} icon={<Icon type="exterior" />} />
      <TileButton caption="Commercial" onTileClick={onCommercialTileClick} icon={<Icon type="commercial" />} />
      <TileButton caption="Single Location" onTileClick={onSingleLocationTileClick} icon={<Icon type="unitlg" />} />
    </div>
  </div>
);

const ChoosePropertyTypeMemo = memo(ChoosePropertyType, areEqual);

export { ChoosePropertyTypeMemo as ChoosePropertyType };
