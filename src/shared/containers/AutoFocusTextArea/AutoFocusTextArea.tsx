import React, { memo, useEffect, useRef } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import formClasses from 'Themes/form/form.module.css';
import { TextArea } from 'Components/TextArea';

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

const AutoFocusTextAreaContainer = ({
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
    <TextArea
      ref={ref}
      minRows={1}
      maxRows={6}
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

AutoFocusTextAreaContainer.defaultProps = {
  className: undefined,
};

const AutoFocusTextAreaContainerMemo = memo(AutoFocusTextAreaContainer, areEqual);

export { AutoFocusTextAreaContainerMemo as AutoFocusTextAreaContainer };
