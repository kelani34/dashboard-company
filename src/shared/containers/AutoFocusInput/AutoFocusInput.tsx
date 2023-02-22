import React, { memo, useEffect, useRef } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { TextBox } from 'Components/TextBox';

import formClasses from 'Themes/form/form.module.css';

interface Props {
  name: string;
  ariaLabel: string;
  placeholder: string;
  value: string;
  autoFocus: boolean;
  className?: string;
  isValid: boolean;
  onValueChange: (e: any) => void;
}

const AutoFocusInputContainer = ({
  name,
  ariaLabel,
  placeholder,
  value,
  autoFocus,
  className,
  isValid,
  onValueChange,
}: Props) => {
  const ref = useRef(null);

  useEffect(() => {
    if (autoFocus) {
      ref.current.focus();
    }
  }, [autoFocus]);

  return (
    <TextBox
      ref={ref}
      type="text"
      className={`mb-0 pb-0 ${formClasses.validateField} ${
        isValid ? formClasses.invalidField : formClasses.validField
      } ${isValid ? 'is-invalid' : ''} ${className || ''}`}
      placeholder={placeholder}
      ariaLabel={ariaLabel}
      name={name}
      value={value}
      onChange={onValueChange}
    />
  );
};

AutoFocusInputContainer.defaultProps = {
  className: undefined,
};

const AutoFocusInputContainerMemo = memo(AutoFocusInputContainer, areEqual);

export { AutoFocusInputContainerMemo as AutoFocusInputContainer };
