import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import classes from './damagedMaterialScope.module.css';

interface Props {
  quantity: number;
  unit: string;
  action: string;
}

const DamagedMaterialScope = ({ quantity, unit, action }: Props) => {
  if (quantity && unit && action) {
    return <span className={classes.scopeContainer}>{`: ${quantity}${unit} - ${action}`}</span>;
  }
  if (quantity && action) {
    return <span className={classes.scopeContainer}>{`: ${quantity} - ${action}`}</span>;
  }
  if (unit && action) {
    return <span className={classes.scopeContainer}>{`: ${unit} - ${action}`}</span>;
  }
  if (quantity && unit) {
    return <span className={classes.scopeContainer}>{`: ${quantity}${unit}`}</span>;
  }
  if (action) {
    return <span className={classes.scopeContainer}>{`: ${action}`}</span>;
  }
  if (quantity) {
    return <span className={classes.scopeContainer}>{`: ${quantity}`}</span>;
  }
  if (unit) {
    return <span className={classes.scopeContainer}>{`: ${unit}`}</span>;
  }
  return <></>;
};

const DamagedMaterialScopeMemo = memo(DamagedMaterialScope, areEqual);

export { DamagedMaterialScopeMemo as DamagedMaterialScope };
