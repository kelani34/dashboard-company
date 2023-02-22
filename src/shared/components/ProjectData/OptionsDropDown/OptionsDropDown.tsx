import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { TextBox } from 'Components/TextBox';
import { Label } from 'Components/Label';
import { Icon } from 'Components/Icons';
import { DropDown } from 'Components/DropDown';

import formClasses from 'Themes/form/form.module.css';
import classes from './optionsDropDown.module.css';

type ListTypes = {
  id: number;
  name: string;
};

interface Props {
  className?: string;
  label?: string;
  optionSelected: string;
  items: Array<ListTypes>;
  selectedOptionId: number;
  invalid?: boolean;
  placeHolder?: string;
  showDropDown: boolean;
  onSelectItem: (e: any) => void;
  onClickIcon: (e: any) => void;
}

const OptionsDropDown = ({
  className,
  label,
  optionSelected,
  items,
  selectedOptionId,
  invalid,
  placeHolder,
  showDropDown,
  onSelectItem,
  onClickIcon,
}: Props) => (
  <div className={`dropdown ${className || ''} ${classes.optionSelectBase}`}>
    {label?.length > 0 && (
      <Label ariaLabel={label} htmlFor="optionSelect" className={classes.label}>
        {label}
      </Label>
    )}
    <TextBox
      name="optionSelect"
      type="text"
      ariaLabel={`Select ${placeHolder}`}
      className={`${formClasses.validateField} ${invalid ? formClasses.invalidField : formClasses.validField}`}
      value={optionSelected}
      readonly
      autoComplete="off"
      placeholder={optionSelected?.length > 0 ? optionSelected : `Select ${placeHolder}`}
    />
    <Icon className={classes.icon} type={showDropDown ? 'caretup' : 'caretdown'} onClick={onClickIcon} />
    {items && (
      <DropDown
        className={classes.dropDown}
        id="roleDropDown"
        items={items}
        selected={selectedOptionId}
        onSelectItem={onSelectItem}
        showDropDown={showDropDown}
      />
    )}
  </div>
);

OptionsDropDown.defaultProps = {
  className: undefined,
  label: undefined,
  invalid: false,
  placeHolder: undefined,
};

const OptionsDropDownMemo = memo(OptionsDropDown, areEqual);

export { OptionsDropDownMemo as OptionsDropDown };
