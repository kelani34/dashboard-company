import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import classes from './validation.background.wrapper.module.css';

interface Props {
  isValid: boolean;
  className?: string;
  children: any;
}
const ValidateBackGround = ({ isValid, className, children }: Props) => (
  <div
    className={`d-flex align-items-end ${classes.container} ${className || ''} ${isValid ? '' : classes.isNotValid}`}
  >
    <div className={classes.maxWidth}>{children}</div>
  </div>
);

ValidateBackGround.defaultProps = {
  className: undefined,
};

const ValidateBackGroundMemo = memo(ValidateBackGround, areEqual);
export { ValidateBackGroundMemo as ValidateBackGround };
