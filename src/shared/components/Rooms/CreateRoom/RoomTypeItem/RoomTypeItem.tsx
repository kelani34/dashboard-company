import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';

import classes from './roomTypeItem.module.css';

interface Props {
  id: number;
  name: string;
  onSelectItem: (e: any) => void;
}

const RoomTypeItem = ({ id, name, onSelectItem }: Props) => (
  <span
    id={id.toString()}
    role="button"
    className={`list-group-item list-group-item-action ${classes.listItemText}`}
    data-id={id}
    data-name={name}
    onMouseUp={onSelectItem}
    tabIndex={0}
  >
    <Icon type={name.toLocaleLowerCase().replace(' ', '')} className={classes.iconWrapper} />
    {name}
  </span>
);

const RoomTypeItemMemo = memo(RoomTypeItem, areEqual);

export { RoomTypeItemMemo as RoomTypeItem };
