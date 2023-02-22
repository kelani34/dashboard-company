import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Anchor } from 'Components/Anchor';

import classes from './listItem.module.css';

interface Props {
  id: number;
  name: string;
  onSelectItem: (e: any) => void;
}

const ListItem = ({ id, name, onSelectItem }: Props) => (
  <li>
    <Anchor
      role="button"
      className={`dropdown-item ${classes.listItemText}`}
      ariaLabel="name"
      dataId={id}
      dataName={name}
      onMouseUp={onSelectItem}
    >
      {name}
    </Anchor>
  </li>
);

const ListItemMemo = memo(ListItem, areEqual);

export { ListItemMemo as ListItem };
