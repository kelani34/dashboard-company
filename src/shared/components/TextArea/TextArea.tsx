import React, { ChangeEvent, memo, KeyboardEvent } from 'react';

import TextareaAutosize from 'react-textarea-autosize';

import { areEqual } from 'Utils/equalityChecks';

import classes from './textArea.module.css';

interface Props {
  id?: string;
  value?: string;
  name: string;
  ariaLabel: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  resizable?: boolean;
  autoComplete?: string;
  rows?: number;
  cols?: number;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: (e: any) => void;
  onBlur?: (e: any) => void;
  onFocus?: (e: any) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
const TextArea = React.forwardRef(
  (
    {
      id,
      value,
      name,
      ariaLabel,
      className,
      required,
      readOnly,
      resizable,
      placeholder,
      rows,
      cols,
      minRows,
      maxRows,
      maxLength,
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
      <TextareaAutosize
        ref={(ref) => {
          inputRef.current = ref;
        }}
        id={id || name}
        value={value}
        name={name || id}
        className={`form-control ${className || ''} ${resizable ? '' : classes.noResize}`}
        required={required}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        minRows={minRows}
        maxRows={maxRows}
        maxLength={maxLength}
        onChange={onChange}
        onClick={onClick}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        onFocus={onFocus}
        aria-label={ariaLabel}
        readOnly={readOnly}
        autoComplete={autoComplete}
      />
    ) : (
      <>
        <TextareaAutosize
          id={id || name}
          value={value}
          name={name || id}
          className={`form-control ${className || ''} ${resizable ? '' : classes.noResize}`}
          required={required}
          placeholder={placeholder}
          rows={rows}
          cols={cols}
          minRows={minRows}
          maxRows={maxRows}
          maxLength={maxLength}
          onChange={onChange}
          onClick={onClick}
          onKeyUp={onKeyUp}
          onBlur={onBlur}
          onFocus={onFocus}
          aria-label={ariaLabel}
          readOnly={readOnly}
          autoComplete={autoComplete}
        />
      </>
    )
);
TextArea.defaultProps = {
  id: undefined,
  value: undefined,
  className: undefined,
  placeholder: undefined,
  required: false,
  autoComplete: 'on',
  readOnly: false,
  resizable: true,
  rows: undefined,
  cols: undefined,
  minRows: undefined,
  maxRows: undefined,
  maxLength: undefined,
  onChange: undefined,
  onClick: undefined,
  onBlur: undefined,
  onFocus: undefined,
  onKeyUp: undefined,
};
const TextAreaMemo = memo(TextArea, areEqual);
export { TextAreaMemo as TextArea };
