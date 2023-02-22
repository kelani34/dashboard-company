import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Trash from '../../../Assets/trash.svg';
import TrashSm from '../../../Assets/trash-sm.svg';
import TrashMd from '../../../Assets/trash-md.svg';
import TrashSmDisabled from '../../../Assets/trash-sm-disabled.svg';
import TrashSmDark from '../../../Assets/trash-sm-dark.svg';
import TrashPhoto from '../../../Assets/trash-photo.svg';

// Custom css
import classes from './trash.module.css';

interface Props {
  className?: string;
  id?: string;
  svgItem?: number;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const TrashSvg = ({ className = '', id, svgItem, onClick, onKeyUp }: Props) => {
  switch (svgItem) {
    case 2:
      return (
        <TrashSm id={id} className={`${classes.trashBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
    case 3:
      return (
        <TrashSmDisabled
          id={id}
          className={`${classes.trashBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    case 4:
      return (
        <TrashSmDark
          id={id}
          className={`${classes.trashBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    case 5:
      return (
        <TrashPhoto id={id} className={`${classes.trashBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
    case 6:
      return (
        <TrashMd id={id} className={`${classes.trashBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
    default:
      return (
        <Trash id={id} className={`${classes.trashBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
  }
};

TrashSvg.defaultProps = {
  className: undefined,
  id: undefined,
  svgItem: 1,
  onClick: undefined,
  onKeyUp: undefined,
};

const TrashSvgMemo = memo(TrashSvg, areEqualShallow);
export { TrashSvgMemo as TrashSvg };
