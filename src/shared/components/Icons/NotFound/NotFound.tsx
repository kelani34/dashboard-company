import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import NotFound from '../../../Assets/not-found.svg';

interface Props {
  className?: string;
  id?: string;
}
const NotFoundSvg = ({ className = '', id }: Props) => <NotFound id={id} className={`${className || ''}`} />;

NotFoundSvg.defaultProps = {
  className: undefined,
  id: undefined,
};

const NotFoundSvgMemo = memo(NotFoundSvg, areEqualShallow);
export { NotFoundSvgMemo as NotFoundSvg };
