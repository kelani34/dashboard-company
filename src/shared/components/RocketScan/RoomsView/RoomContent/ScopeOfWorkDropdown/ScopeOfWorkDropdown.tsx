import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { TextBox } from 'Components/TextBox';
import { Icon } from 'Components/Icons';
import { DropDown } from 'Components/DropDown';

import formClasses from 'Themes/form/form.module.css';
import classes from './scopeOfWorkDropdown.module.css';

interface Props {
  dropdownType: string;
  className?: string;
  selectedOption: string;
  choices: Array<any>;
  selectedOptionId: number;
  invalid?: boolean;
  showDropDown: boolean;

  onChangeValueSelect: (e: any) => void;
  onSelectItem: (e: any) => void;
  onClickIcon: (e: any) => void;
}

const ScopeOfWorkDropdown = ({
  dropdownType,
  className,
  selectedOption,
  choices,
  selectedOptionId,
  invalid,
  showDropDown,
  onChangeValueSelect,
  onSelectItem,
  onClickIcon,
}: Props) => (
  <div className={`dropdown ${className || ''} ${classes.dropdownSelectBase}`}>
    <TextBox
      name={`${dropdownType}Select`}
      type="text"
      ariaLabel="Select a Floor"
      className={`${formClasses.validateField} ${invalid ? formClasses.invalidField : formClasses.validField}`}
      value={selectedOption}
      onChange={onChangeValueSelect}
      autoComplete="off"
      placeholder=""
    />
    <Icon className={classes.icon} type={showDropDown ? 'caretup' : 'caretdown'} onClick={onClickIcon} />
    {choices && (
      <DropDown
        className={classes.dropDown}
        id={dropdownType}
        items={choices}
        selected={selectedOptionId}
        onSelectItem={onSelectItem}
        showDropDown={showDropDown}
      />
    )}
  </div>
);

ScopeOfWorkDropdown.defaultProps = {
  className: undefined,
  invalid: false,
};

const ScopeOfWorkDropdownMemo = memo(ScopeOfWorkDropdown, areEqual);

export { ScopeOfWorkDropdownMemo as ScopeOfWorkDropdown };
