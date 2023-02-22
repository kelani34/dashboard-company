import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import PhotoNote from '../../../Assets/photo-note.svg';

// Custom css
import classes from './photoNote.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const PhotoNoteSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <PhotoNote id={id} className={`${classes.photoNoteBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

PhotoNoteSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const PhotoNoteSvgMemo = memo(PhotoNoteSvg, areEqualShallow);
export { PhotoNoteSvgMemo as PhotoNoteSvg };
