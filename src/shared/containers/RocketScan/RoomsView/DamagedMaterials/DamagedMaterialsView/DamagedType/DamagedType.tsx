import React, { memo, useLayoutEffect, useState } from 'react';

import { DamageIcon } from 'Components/Icons';
import { areEqual } from 'Utils/equalityChecks';
import { useDamagedMaterialFunctions } from 'Context/RocketScan';

import { DamagedMaterialViewList } from 'Components/RocketScan';
import classes from './damageType.module.css';

interface Props {
  damageType: any;
}

const DamagedTypeContainer = ({ damageType }: Props) => {
  const { selectedMaterials }: any = useDamagedMaterialFunctions();

  const { id, name } = damageType;

  const [materials, setMaterials] = useState([]);

  useLayoutEffect(() => {
    setMaterials(selectedMaterials.filter(({ damage_type: { id: damageTypeId } }: any) => damageTypeId === id));
  }, [selectedMaterials]);

  return (
    materials.length > 0 && (
      <div className={classes.damageType}>
        <div className={classes.damageTypeNameContainer}>
          <DamageIcon type={`${name}32`} />
          <span className={classes.name}>{name}</span>
        </div>
        <div className={classes.materials}>
          <DamagedMaterialViewList materials={materials} />
        </div>
      </div>
    )
  );
};

const DamagedTypeContainerMemo = memo(DamagedTypeContainer, areEqual);

export { DamagedTypeContainerMemo as DamagedTypeContainer };
