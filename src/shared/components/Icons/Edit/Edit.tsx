import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Edit from '../../../Assets/edit-lg.svg';
import EditSm from '../../../Assets/edit.svg';
import EditMd from '../../../Assets/edit-md.svg';

// Custom css
import classes from './edit.module.css';

interface Props {
  className?: string;
  id?: string;
  svgItem?: number;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const EditSvg = ({ className = '', id, svgItem, onClick, onKeyUp }: Props) => {
  switch (svgItem) {
    case 2:
      return (
        <EditSm id={id} className={`${classes.editBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
    case 3:
      return (
        <EditMd id={id} className={`${classes.editBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
    default:
      return <Edit id={id} className={`${classes.editBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />;
  }
};

EditSvg.defaultProps = {
  className: undefined,
  id: undefined,
  svgItem: 1,
  onClick: undefined,
  onKeyUp: undefined,
};

const EditSvgMemo = memo(EditSvg, areEqualShallow);
export { EditSvgMemo as EditSvg };
