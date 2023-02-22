import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { TextBox } from 'Components/TextBox';
import { Icon } from 'Components/Icons';
import { DropDown, dropdownSizes } from 'Components/DropDown';

import formClasses from 'Themes/form/form.module.css';
import classes from './miniOptionsDropdown.module.css';

type ListTypes = {
  id: number;
  name: string;
};

interface Props {
  className?: string;
  optionSelected: string;
  items: Array<ListTypes>;
  selectedOptionId: number;
  invalid?: boolean;
  placeHolder?: string;
  showDropdown: boolean;
  onSelectItem: (e: any) => void;
  onClickIcon: (e: any) => void;
}

const MiniOptionsDropdown = ({
  className,
  optionSelected,
  items,
  selectedOptionId,
  invalid,
  placeHolder,
  showDropdown,
  onSelectItem,
  onClickIcon,
}: Props) => (
  <div className={`dropdown ${className || ''} ${classes.optionSelectBase}`}>
    <TextBox
      name="optionSelect"
      type="text"
      ariaLabel={`Select ${placeHolder}`}
      className={`${formClasses.validateField} ${invalid ? formClasses.invalidField : formClasses.validField} ${
        classes.input
      }`}
      value={optionSelected}
      readonly
      autoComplete="off"
      placeholder={optionSelected?.length > 0 ? optionSelected : `${placeHolder}`}
    />
    <Icon className={classes.icon} type={showDropdown ? 'caretup' : 'caretdown'} onClick={onClickIcon} />
    {items && (
      <DropDown
        className={classes.dropdown}
        id="roleDropdown"
        items={items}
        selected={selectedOptionId}
        onSelectItem={onSelectItem}
        showDropDown={showDropdown}
        size={dropdownSizes.small}
      />
    )}
  </div>
);

MiniOptionsDropdown.defaultProps = {
  className: undefined,
  invalid: false,
  placeHolder: undefined,
};

const MiniOptionsDropdownMemo = memo(MiniOptionsDropdown, areEqual);

export { MiniOptionsDropdownMemo as MiniOptionsDropdown };
