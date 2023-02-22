import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { ListItem } from './ListItem';

import classes from './fieldList.module.css';

type ListTypes = {
  id: number;
  name: string;
};

interface Props {
  id: string;
  className?: string;
  list: Array<ListTypes>;
  showDropDown: boolean;
  onSelectItem: (e: any) => void;
}

const FieldList = ({ id, className, list, onSelectItem, showDropDown }: Props) => (
  <ul
    id={id}
    className={`dropdown-menu ${classes.fieldListBase} ${className || ''} ${showDropDown ? 'show' : ''}`}
    aria-labelledby={id}
  >
    {list.map((item) => (
      <ListItem key={item.id} id={item.id} name={item.name} onSelectItem={onSelectItem} />
    ))}
  </ul>
);

FieldList.defaultProps = {
  className: undefined,
};

const FieldListMemo = memo(FieldList, areEqual);

export { FieldListMemo as FieldList };
