import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';

import classes from './phone.module.css';

interface Props {
  phone: string;
  children: any;
  className?: string;
}

const PhoneAnchor = ({ phone, children, className }: Props) => (
  <a
    href={`tel:1+${phone}`}
    className={`${classes.phoneAnchorBase} d-flex flex-row align-items-center justify-content-center ${className}`}
  >
    <span className="p-2">
      <Icon type="employeephone" />
    </span>
    <span className={`p-2 ${classes.phoneInfo}`}>{children}</span>
  </a>
);

PhoneAnchor.defaultProps = {
  className: undefined,
};

const PhoneAnchorMemo = memo(PhoneAnchor, areEqual);
export { PhoneAnchorMemo as PhoneAnchor };
