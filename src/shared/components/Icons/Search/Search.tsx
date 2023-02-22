import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Search from '../../../Assets/search.svg';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const SearchSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Search id={id} className={className || ''} onClick={onClick} onKeyUp={onKeyUp} />
);

SearchSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const SearchSvgMemo = memo(SearchSvg, areEqualShallow);
export { SearchSvgMemo as SearchSvg };
