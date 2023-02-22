import React, { ChangeEvent, memo, KeyboardEvent } from 'react';

import { areEqual } from 'Utils/equalityChecks';

interface Props {
  id?: string;
  value?: string;
  defaultValue?: string;
  name: string;
  type: string;
  ariaLabel: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  autoComplete?: string;
  pattern?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: any) => void;
  onBlur?: (e: any) => void;
  onFocus?: (e: any) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
const TextBox = React.forwardRef(
  (
    {
      id,
      value,
      defaultValue,
      name,
      type,
      ariaLabel,
      className,
      required,
      readonly,
      placeholder,
      pattern,
      disabled,
      onChange,
      onClick,
      onBlur,
      onFocus,
      onKeyUp,
      autoComplete,
    }: Props,
    inputRef: any
  ) =>
    inputRef ? (
      <input
        ref={(ref) => {
          inputRef.current = ref;
        }}
        id={id || name}
        value={value}
        defaultValue={defaultValue}
        name={name || id}
        className={`form-control ${className || ''}`}
        type={type}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onClick={onClick}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        onFocus={onFocus}
        aria-label={ariaLabel}
        readOnly={readonly}
        autoComplete={autoComplete}
        pattern={pattern}
      />
    ) : (
      <>
        <input
          id={id || name}
          value={value}
          defaultValue={defaultValue}
          name={name || id}
          className={`form-control ${className || ''}`}
          type={type}
          required={required}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          onClick={onClick}
          onKeyUp={onKeyUp}
          onBlur={onBlur}
          onFocus={onFocus}
          aria-label={ariaLabel}
          readOnly={readonly}
          autoComplete={autoComplete}
          pattern={pattern}
        />
      </>
    )
);
TextBox.defaultProps = {
  id: undefined,
  value: undefined,
  defaultValue: undefined,
  className: undefined,
  placeholder: undefined,
  required: false,
  autoComplete: 'on',
  pattern: undefined,
  disabled: false,
  readonly: false,
  onChange: undefined,
  onClick: undefined,
  onBlur: undefined,
  onFocus: undefined,
  onKeyUp: undefined,
};
const TextBoxMemo = memo(TextBox, areEqual);
export { TextBoxMemo as TextBox };
