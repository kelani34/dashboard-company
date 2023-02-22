import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import DropzoneBackground from '../../../Assets/dropzone-background.svg';

// Custom css
import classes from './dropzonebackground.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const DropzoneBackgroundSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <DropzoneBackground
    id={id}
    className={`${classes.dropzoneBackgroundBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

DropzoneBackgroundSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const DropzoneBackgroundSvgMemo = memo(DropzoneBackgroundSvg, areEqualShallow);
export { DropzoneBackgroundSvgMemo as DropzoneBackgroundSvg };
