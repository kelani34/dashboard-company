import React, { ChangeEvent, KeyboardEvent, memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

/*
    Todo:  Use the bs markup and base classes.
    THen test with an overload on witdh and see which takes precedence.
*/
interface Props {
  id?: string;
  checked: boolean;
  className: string;
  name?: string;
  autoComplete?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
}
const CheckBox = ({ id, checked, className, name, autoComplete = 'off', disabled, onChange, onKeyUp }: Props) => (
  <input
    id={id}
    type="checkbox"
    className={className}
    name={name}
    autoComplete={autoComplete}
    onChange={onChange}
    onKeyUp={onKeyUp}
    checked={checked}
    disabled={disabled}
  />
);

CheckBox.defaultProps = {
  id: undefined,
  onKeyUp: undefined,
  name: undefined,
  disabled: false,
  autoComplete: undefined,
};

const CheckBoxMemo = memo(CheckBox, areEqual);
export { CheckBoxMemo as CheckBox };
