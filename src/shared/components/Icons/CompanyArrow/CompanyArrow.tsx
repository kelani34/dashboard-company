import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import CompanyArrow from '../../../Assets/company-arrow.svg';

// Custom css
import classes from './companyArrow.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const CompanyArrowSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <CompanyArrow
    id={id}
    className={`${classes.companyArrowBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

CompanyArrowSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CompanyArrowSvgMemo = memo(CompanyArrowSvg, areEqualShallow);
export { CompanyArrowSvgMemo as CompanyArrowSvg };
