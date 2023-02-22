import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

// css
import classes from './errorMessages.module.css';

// props
interface Props {
  message: string;
  className?: string;
}

const ErrorMessages = ({ message, className }: Props) => (
  <div className={`${className || classes.errorMessageWrapper}`}>
    <p className={`${classes.errorMessage}`}>{message}</p>
  </div>
);

ErrorMessages.defaultProps = {
  className: undefined,
};

const ErrorMessagesMemo = memo(ErrorMessages, areEqual);

export { ErrorMessagesMemo as ErrorMessages };
