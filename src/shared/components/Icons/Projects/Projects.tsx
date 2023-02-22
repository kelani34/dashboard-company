import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';

import Projects from '../../../Assets/projects.svg';

// Custom css
import classes from './projects.module.css';

interface Props {
  className?: string;
  fill: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const ProjectsSvg = ({ className = '', fill = '#5B476B', id, onClick, onKeyUp }: Props) => (
  <Projects
    id={id}
    className={`${classes.logoIconBase} ${className || ''}`}
    fill={fill}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

ProjectsSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const ProjectsSvgMemo = memo(ProjectsSvg, areEqualShallow);
export { ProjectsSvgMemo as ProjectsSvg };
