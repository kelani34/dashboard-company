import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import classes from './projectRow.module.css';

interface Props {
  title: any;
  uid: any;
  alias: any;
  numOfUnits: number;
  numOfPhotos: number;
  numOfFloors: number;
  selected: boolean;
  onClick: any;
}

const ProjectRow = ({ title, uid, alias, numOfPhotos, numOfUnits, selected, onClick, numOfFloors }: Props) => (
  <div
    onClick={onClick}
    onKeyUp={onClick}
    className={`${selected ? classes.mainActive : classes.main}`}
    role="button"
    tabIndex={0}
  >
    <div className={`${selected ? classes.titleActive : classes.title}`}>{title}</div>
    <div className={`${classes.row}`}>
      <div className={`${classes.uid}`}>{uid}</div>
      <div className={`${classes.numbers}`}>
        {`${numOfUnits} Units • ${numOfFloors} Floors • ${numOfPhotos} Photos`}
      </div>
    </div>
    {alias && <div className={classes.alias}>{alias}</div>}
  </div>
);

const ProjectRowMemo = memo(ProjectRow, areEqual);

export { ProjectRowMemo as ProjectRow };
