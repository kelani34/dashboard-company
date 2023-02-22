import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import classes from './newTabAnchor.module.css';

interface Props {
  href: string;
  className?: string;
  children: any;
}

const NewTabAnchor = ({ href, className, children }: Props) => (
  <a href={href} className={`${classes.anchorBase} ${className || ''}`} rel="noopener noreferrer" target="_blank">
    {children}
  </a>
);

NewTabAnchor.defaultProps = {
  className: undefined,
};

// This to allows default props
const NewTabAnchorMemo = memo(NewTabAnchor, areEqual);
export { NewTabAnchorMemo as NewTabAnchor };
