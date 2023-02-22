import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import classes from './toggle.module.css';

interface Props {
  id?: string;
  text?: string;
  disabled?: boolean;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}
const Toggle = ({ id = 'toggle', text = '', disabled = false, checked = true, onChange }: Props) => {
  // Is the checkbox checked
  const onChangeToggle = ({ target: { checked } }: any) => {
    // Destructure whether the control has been checked or not
    if (onChange) onChange(checked);
  };

  return (
    <div className={`form-check form-switch ${classes['form-switch-override']}`}>
      <input
        className={`form-check-input ${checked ? '' : classes['form-check-input-override']}  ${
          classes['form-check-override']
        }`}
        role="button"
        type="checkbox"
        id={id}
        disabled={disabled}
        checked={checked}
        onChange={onChangeToggle}
      />
      <label className="form-check-label" htmlFor={id}>
        {text}
      </label>
    </div>
  );
};

Toggle.defaultProps = {
  id: undefined,
  text: undefined,
  disabled: undefined,
};

const ToggleMemo = memo(Toggle, areEqual);
export { ToggleMemo as Toggle };
