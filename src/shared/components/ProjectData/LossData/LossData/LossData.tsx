import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Header } from 'Components/ProjectData/Header';
import { DamageTypes, DamageInfo, AffectedLocations } from 'Containers/ProjectData';

import classes from './lossData.module.css';

interface Props {
  onEditButtonClick: (e: any) => void;
}

const LossData = ({ onEditButtonClick }: Props) => (
  <div className="d-flex flex-column justify-content-start align-items-center w-100">
    <div className={`${classes.lossDataBase}`}>
      <Header title="Loss Data" onEditButtonClick={onEditButtonClick} />
      <DamageTypes />
      <DamageInfo />
      <AffectedLocations />
    </div>
  </div>
);

const LossDataMemo = memo(LossData, areEqual);
export { LossDataMemo as LossData };
