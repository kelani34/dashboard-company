import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';

import classes from './emailAnchor.module.css';

interface Props {
  address: string;
  children: any;
  className?: string;
}

const EmailAnchor = ({ address, children, className }: Props) => (
  <a
    href={`mailto:${address}`}
    className={`${classes.emailAnchorBase} d-flex flex-row align-items-center justify-content-center ${className}`}
  >
    <span className="p-2">
      <Icon className={classes.icon} type="email" />
    </span>
    <span className={`p-2 ${classes.text}`}>{children}</span>
  </a>
);

EmailAnchor.defaultProps = {
  className: undefined,
};
const EmailAnchorMemo = memo(EmailAnchor, areEqual);
export { EmailAnchorMemo as EmailAnchor };
