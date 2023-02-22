import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Email from '../../../Assets/email-new.svg';

// Custom css
import classes from './email.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const EmailSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Email id={id} className={`${classes.emailBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

EmailSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const EmailSvgMemo = memo(EmailSvg, areEqualShallow);
export { EmailSvgMemo as EmailSvg };
