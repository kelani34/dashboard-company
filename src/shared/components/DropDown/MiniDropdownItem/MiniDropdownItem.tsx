import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Anchor } from 'Components/Anchor';

import classes from './miniDropdownItem.module.css';

interface Props {
  id: number;
  name: string;
  selected: number;
  onSelectItem: (e: any) => void;
}

const MiniDropdownItem = React.forwardRef(({ id, name, selected, onSelectItem }: Props, dropDownRef: any) =>
  dropDownRef ? (
    <li
      key={id && id}
      id={id && id.toString()}
      ref={(ref) => {
        dropDownRef.current = ref;
      }}
    >
      <Anchor
        role="button"
        tabIndex={-1}
        className={`dropdown-item ${classes.miniDropdownItem} ${classes.dropDownItemText} ${
          selected === id ? classes.dropDownItemTextSelected : ''
        }`}
        ariaLabel="contactType"
        dataName={name}
        onClick={onSelectItem}
      >
        {name}
      </Anchor>
    </li>
  ) : (
    <li>
      <Anchor
        role="button"
        tabIndex={-1}
        className={`dropdown-item ${classes.miniDropdownItem} ${classes.dropDownItemText} ${
          selected === id ? classes.dropDownItemTextSelected : ''
        }`}
        ariaLabel="contactType"
        dataName={name}
        onClick={onSelectItem}
      >
        {name}
      </Anchor>
    </li>
  )
);

const MiniDropdownItemMemo = memo(MiniDropdownItem, areEqual);

export { MiniDropdownItemMemo as MiniDropdownItem };
