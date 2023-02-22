import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';

import { Toggle } from 'Components/Toggle';
import classes from './sourceMarker.module.css';

interface Props {
  sourceIsChecked: boolean;
  onSourceToggleClick: (e: any) => void;
}

const SourceMarker = ({ sourceIsChecked, onSourceToggleClick }: Props) => (
  <div className={classes.sourceContainer}>
    <div className={classes.markSource}>
      Mark as Source
      <span>
        <Toggle checked={sourceIsChecked} onChange={onSourceToggleClick} />
      </span>
    </div>
    <div className="d-none">
      Change Room
      <Icon className={classes.editIcon} type="edit" />
    </div>
  </div>
);

const SourceMarkerMemo = memo(SourceMarker, areEqual);

export { SourceMarkerMemo as SourceMarker };
