import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { DropDownItem } from 'Containers/DropDown';

import classes from './dropDown.module.css';

type ListTypes = {
  id: number;
  name: string;
  // eslint-disable-next-line
  display_name?: string;
};
interface Props {
  id: string;
  className?: string;
  selected: number;
  items: Array<ListTypes>;
  showDropDown: boolean;
  size?: string;
  onSelectItem: (e: any) => void;
}

const DropDown = ({ id, className, selected, items, onSelectItem, showDropDown, size }: Props) => (
  <ul
    id={id}
    className={`dropdown-menu ${classes.fieldListBase} ${className || ''} ${showDropDown ? 'show' : ''}`}
    aria-labelledby={id}
  >
    {items.length > 0 &&
      items.map((item) => (
        <DropDownItem
          key={item.id}
          id={item.id}
          name={item.display_name?.length ? item.display_name : item.name}
          selected={selected}
          onSelectItem={onSelectItem}
          showDropDown={showDropDown}
          size={size}
        />
      ))}
  </ul>
);

DropDown.defaultProps = {
  className: undefined,
  size: 'default',
};

const DropDownMemo = memo(DropDown, areEqual);

export { DropDownMemo as DropDown };
