import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';

import classes from './unitHeader.module.css';

interface Props {
  unitName: string;
  unitType?: string;
}

// temporary user feedback during development
// const temporaryButtonAction = () => alert("Temporarily disabled for development");

const UnitHeader = ({ unitName, unitType }: Props) => (
  <div
    className={`container-fluid d-flex flex-row justify-content-between align-items-center p-0 ${classes.unitHeaderBase}`}
  >
    <div className="col d-flex flex-row justify-content-start align-items-center">
      <div className={classes.imageWrapper}>
        <Icon type={unitType} />
      </div>
      <h1 className={classes.locationName}>{unitName}</h1>
    </div>
    {/* <Icon type="actionsdefault" onClick={temporaryButtonAction} /> */}
  </div>
);

UnitHeader.defaultProps = {
  unitType: 'singleHome',
};

const UnitHeaderMemo = memo(UnitHeader, areEqual);

export { UnitHeaderMemo as UnitHeader };
