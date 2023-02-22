import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Anchor } from 'Components/Anchor';
import { RoomIcon } from 'Components/Icons';

import classes from './roomTypeItem.module.css';

interface Props {
  id: number;
  name: string;
  isStandard?: boolean;
  onSelectItem: (e: any) => void;
}

const getIconName = (name, isStandard) => {
  if (!isStandard) {
    return 'customroom';
  }

  return name.toLocaleLowerCase().replace(' ', '');
};

const RoomTypeItem = ({ id, name, isStandard, onSelectItem }: Props) => (
  <Anchor
    id={id.toLocaleString()}
    href="#"
    className={`list-group-item list-group-item-action ${classes.listItem}`}
    ariaLabel="name"
    dataId={id}
    dataName={name}
    onClick={onSelectItem}
  >
    <span className={classes.iconWrapper}>
      <RoomIcon type={getIconName(name, isStandard)} />
    </span>
    <span className={classes.listItemText}>{name}</span>
  </Anchor>
);

RoomTypeItem.defaultProps = {
  isStandard: true,
};

const RoomTypeItemMemo = memo(RoomTypeItem, areEqual);

export { RoomTypeItemMemo as RoomTypeItem };
