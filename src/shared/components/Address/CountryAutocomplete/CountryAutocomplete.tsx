import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { TextBox } from 'Components/TextBox';
import { FieldList } from 'Components/Address/FieldList';
import { Icon } from 'Components/Icons';

import classes from './countryAutocomplete.module.css';

interface Props {
  className?: string;
  country: string;
  countries: Array<any>;
  invalid?: boolean;
  showDropDown: boolean;
  showCaretIcon: boolean;
  onChangeCountry: (e: any) => void;
  onSelectItem: (e: any) => void;
  onClickCaretIcon: (e: any) => void;
}

const CountryAutocomplete = ({
  className,
  country,
  countries,
  invalid,
  onChangeCountry,
  onSelectItem,
  showDropDown,
  showCaretIcon,
  onClickCaretIcon,
}: Props) => (
  <div className={`dropdown ${className || ''}`}>
    <TextBox
      name="country"
      type="text"
      ariaLabel="Select a country"
      className={`${classes.validateField} ${invalid ? classes.invalidField : classes.validField}`}
      value={country}
      onChange={onChangeCountry}
      autoComplete="off"
      placeholder="ex. USA"
    />

    {showCaretIcon && (
      <Icon className={classes.icon} type={showDropDown ? 'caretup' : 'caretdown'} onClick={onClickCaretIcon} />
    )}

    {countries.length > 0 && (
      <FieldList id="countryDropDown" list={countries} onSelectItem={onSelectItem} showDropDown={showDropDown} />
    )}
  </div>
);

CountryAutocomplete.defaultProps = {
  className: undefined,
  invalid: false,
};

const CountryAutocompleteMemo = memo(CountryAutocomplete, areEqual);

export { CountryAutocompleteMemo as CountryAutocomplete };
