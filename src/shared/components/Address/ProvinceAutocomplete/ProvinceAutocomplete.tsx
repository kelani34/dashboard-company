import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { TextBox } from 'Components/TextBox';
import { FieldList } from 'Components/Address/FieldList';
import { Icon } from 'Components/Icons';

import classes from './provinceAutocomplete.module.css';

interface Props {
  className?: string;
  province: string;
  provinces: Array<any>;
  invalid?: boolean;
  showDropDown: boolean;
  showCaretIcon: boolean;
  onChangeProvince: (e: any) => void;
  onSelectItem: (e: any) => void;
  onClickCaretIcon: (e: any) => void;
}

const ProvinceAutocomplete = ({
  className,
  province,
  provinces,
  invalid,
  onChangeProvince,
  onSelectItem,
  showDropDown,
  showCaretIcon,
  onClickCaretIcon,
}: Props) => (
  <div className={`dropdown ${className || ''}`}>
    <TextBox
      name="province"
      type="text"
      ariaLabel="Select a country"
      className={`${classes.validateField} ${invalid ? classes.invalidField : classes.validField}`}
      value={province}
      onChange={onChangeProvince}
      autoComplete="off"
      placeholder="ex. California"
    />
    {showCaretIcon && (
      <Icon className={classes.icon} type={showDropDown ? 'caretup' : 'caretdown'} onClick={onClickCaretIcon} />
    )}
    {provinces.length > 0 && (
      <FieldList id="countryDropDown" list={provinces} onSelectItem={onSelectItem} showDropDown={showDropDown} />
    )}
  </div>
);

ProvinceAutocomplete.defaultProps = {
  className: undefined,
  invalid: false,
};

const ProvinceAutocompleteMemo = memo(ProvinceAutocomplete, areEqual);

export { ProvinceAutocompleteMemo as ProvinceAutocomplete };
