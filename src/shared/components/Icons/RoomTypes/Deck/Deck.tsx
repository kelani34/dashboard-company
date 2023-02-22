import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Deck from '../../../../Assets/deck.svg';

// Custom css
import classes from './deck.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const DeckSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Deck id={id} className={`${classes.deckBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

DeckSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const DeckSvgMemo = memo(DeckSvg, areEqualShallow);
export { DeckSvgMemo as DeckSvg };
