import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import ClickOutsideListener from 'HOC/ClickOutsideListener';

import { Label } from 'Components/Label';
import { TextBox } from 'Components/TextBox';
import { ValidateBackGround } from 'Components/Validation';
import { PlacePredictions } from 'Components/Address/GoogleAutocomplete/PlacePredictions';

import classes from './googleAutocomplete.module.css';

interface Props {
  address: string;
  isValid?: boolean;
  placePredictions: any;
  showDropDown: boolean;
  onChangeAddress: (e: any) => void;
  onSelectItem: (e: any) => void;
  onblur: (e: any) => void;
}

const GoogleAutocomplete = ({
  address,
  onChangeAddress,
  isValid,
  placePredictions,
  onSelectItem,
  showDropDown,
  onblur,
}: Props) => (
  <div className="position-relative">
    <ValidateBackGround isValid={isValid}>
      <Label ariaLabel="Address" className={classes.label} htmlFor="address">
        Search Address
      </Label>
      <TextBox
        value={address}
        type="address"
        name="address"
        autoComplete="off"
        className={`${classes.validateField} ${classes.validField}`}
        placeholder="Ex. 123 Main Street"
        ariaLabel="Please enter the address"
        onChange={onChangeAddress}
      />
    </ValidateBackGround>
    <ClickOutsideListener clickOutside={onblur}>
      <PlacePredictions placePredictions={placePredictions} onSelectItem={onSelectItem} showDropDown={showDropDown} />
    </ClickOutsideListener>
  </div>
);

GoogleAutocomplete.defaultProps = {
  isValid: true,
};

const GoogleAutocompleteMemo = memo(GoogleAutocomplete, areEqual);

export { GoogleAutocompleteMemo as GoogleAutocomplete };
