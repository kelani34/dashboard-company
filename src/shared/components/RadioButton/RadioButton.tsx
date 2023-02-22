import React, { KeyboardEvent, memo, MouseEvent } from 'react';
import { areEqual } from 'Utils/equalityChecks';

interface Props {
  className: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLElement>) => void;
}

const RadioButton = ({ className, onClick, onKeyUp }: Props) => (
  <input className={className} onClick={onClick} onKeyUp={onKeyUp} type="radio" />
);

RadioButton.defaultProps = {
  onKeyUp: null,
};

const RadioButtonMemo = memo(RadioButton, areEqual);
export { RadioButtonMemo as RadioButton };
