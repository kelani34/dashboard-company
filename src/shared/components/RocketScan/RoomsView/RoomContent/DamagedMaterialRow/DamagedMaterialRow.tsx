import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';
import { ScopeOfWorkEdit } from 'Containers/RocketScan/RoomsView';
import classes from './damagedMaterialRow.module.css';

interface Props {
  id: number;
  name: string;
  isSelected: boolean;
  selectedMaterial?: any;
  onClick: (e: any) => void;
}

const DamagedMaterialRow = ({ id, name, isSelected, selectedMaterial, onClick }: Props) => (
  <div className={classes.container}>
    <span
      role="button"
      className={`${classes.materialLabel} ${isSelected ? classes.checked : ''}`}
      onClick={onClick}
      onKeyUp={onClick}
      tabIndex={0}
    >
      <Icon className={classes.icon} type={isSelected ? 'checkbox' : 'square'} />
      {name}
    </span>
    {isSelected && selectedMaterial && <ScopeOfWorkEdit materialId={id} material={selectedMaterial} />}
  </div>
);

DamagedMaterialRow.defaultProps = {
  selectedMaterial: undefined,
};

const DamagedMaterialRowMemo = memo(DamagedMaterialRow, areEqual);

export { DamagedMaterialRowMemo as DamagedMaterialRow };
