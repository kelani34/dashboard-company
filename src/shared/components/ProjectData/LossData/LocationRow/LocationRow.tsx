import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';
import { Button } from 'Components/Button';
import { PillBadge } from 'Components/PillBadge';

import classes from './locationRow.module.css';

interface Props {
  location: any;
  onClick: (e: any) => void;
}

const LocationRow = ({ location, onClick }: Props) => (
  <Button className={classes.container} onClick={onClick}>
    <span>
      {location.name}
      {location.is_source ? <PillBadge text="Source" className={classes.badge} /> : <></>}
    </span>
    <Icon type="chevronnext" />
  </Button>
);

const LocationRowMemo = memo(LocationRow, areEqual);

export { LocationRowMemo as LocationRow };
