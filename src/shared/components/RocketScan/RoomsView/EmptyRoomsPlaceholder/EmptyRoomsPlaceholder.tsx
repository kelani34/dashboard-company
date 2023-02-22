import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';

import classes from './emptyRoomsPlaceholder.module.css';

const EmptyRoomsPlaceholder = () => (
  <div className={classes.emptyRoomsPlaceholderBase}>
    <p className={classes.noRoomsText}>No rooms yet. Add a new room</p>
    <Icon type="rocketemblem" />
  </div>
);

const EmptyRoomsPlaceholderMemo = memo(EmptyRoomsPlaceholder, areEqual);

export { EmptyRoomsPlaceholderMemo as EmptyRoomsPlaceholder };
