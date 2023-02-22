import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { TextBox } from 'Components/TextBox';
import { Icon } from 'Components/Icons';
import { DropDown } from 'Components/DropDown';

import formClasses from 'Themes/form/form.module.css';
import classes from './floorDropDown.module.css';

interface Props {
  className?: string;
  floorSelect: string;
  numbers: Array<any>;
  selectedFloor: number;
  invalid?: boolean;
  showDropDown: boolean;
  onChangeFloorSelect: (e: any) => void;
  onSelectItem: (e: any) => void;
  onClickIcon: (e: any) => void;
}

const FloorDropDown = ({
  className,
  floorSelect,
  numbers,
  selectedFloor,
  invalid,
  showDropDown,
  onChangeFloorSelect,
  onSelectItem,
  onClickIcon,
}: Props) => (
  <div className={`dropdown ${className || ''} ${classes.floorSelectBase}`}>
    <TextBox
      name="floorSelect"
      type="text"
      ariaLabel="Select a Floor"
      className={`${formClasses.validateField} ${invalid ? formClasses.invalidField : formClasses.validField}`}
      value={floorSelect}
      onChange={onChangeFloorSelect}
      autoComplete="off"
      placeholder="Select a Floor"
    />
    <Icon className={classes.icon} type={showDropDown ? 'caretup' : 'caretdown'} onClick={onClickIcon} />
    {numbers && (
      <DropDown
        className={classes.dropDown}
        id="floorDropDown"
        items={numbers}
        selected={selectedFloor}
        onSelectItem={onSelectItem}
        showDropDown={showDropDown}
      />
    )}
  </div>
);

FloorDropDown.defaultProps = {
  className: undefined,
  invalid: false,
};

const FloorDropDownMemo = memo(FloorDropDown, areEqual);

export { FloorDropDownMemo as FloorDropDown };
