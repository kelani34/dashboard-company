import React, { memo, KeyboardEvent } from 'react';
import { areEqual } from 'Utils/equalityChecks';

// import classes from './anchor.module.css';

interface Props {
  id?: string;
  className?: string;
  href?: string;
  ariaLabel?: string;
  role?: string;
  tabIndex?: number;
  dataId?: number | string;
  dataName?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLElement>) => void;
  onMouseUp?: (e: any) => void;
  onMouseDown?: (e: any) => void;
  children: any;
}
const Anchor = ({
  id,
  className = '',
  href = '/',
  ariaLabel,
  role,
  tabIndex,
  dataId,
  dataName,
  children,
  onClick,
  onKeyUp,
  onMouseDown,
  onMouseUp,
}: Props) => (
  <a
    id={id}
    href={href}
    className={className}
    role={role}
    tabIndex={tabIndex}
    onClick={onClick}
    onMouseUp={onMouseUp}
    onMouseDown={onMouseDown}
    onKeyUp={onKeyUp}
    aria-label={ariaLabel}
    data-id={dataId}
    data-name={dataName}
  >
    {children}
  </a>
);

Anchor.defaultProps = {
  id: null,
  className: null,
  href: null,
  role: 'link',
  tabIndex: undefined,
  ariaLabel: null,
  dataId: null,
  dataName: null,
  onClick: null,
  onMouseUp: null,
  onMouseDown: null,
  onKeyUp: null,
};

// This to allows default props
const AnchorMemo = memo(Anchor, areEqual);
export { AnchorMemo as Anchor };
