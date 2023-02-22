import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { TextBox } from 'Components/TextBox';
import { Icon } from 'Components/Icons';
import { ClearButton } from 'Components/Button';
import classes from './searchBox.module.css';

interface Props {
  id: string;
  name: string;
  ariaLabel: string;
  placeholder?: string;
  value: string;
  onChangeValue: (e: any) => void;
  onClickClearButton: (e: any) => void;
}

const SearchBox = React.forwardRef(
  ({ id, name, ariaLabel, placeholder, value, onChangeValue, onClickClearButton }: Props, textBoxRef: any) => (
    <div className={`${classes.searchBoxBase} ${value.length > 0 ? classes.purpleBorder : ''}`}>
      <Icon type="search" />
      <TextBox
        ref={textBoxRef}
        id={id}
        className={classes.textBox}
        onChange={onChangeValue}
        name={name}
        type="text"
        ariaLabel={ariaLabel}
        placeholder={placeholder}
      />
      <div className={`${classes.clearButton} ${value.length > 0 ? 'd-block' : 'd-none'}`}>
        <ClearButton onClick={onClickClearButton} />
      </div>
    </div>
  )
);

SearchBox.defaultProps = {
  placeholder: 'Search ...',
};

const SearchBoxMemo = memo(SearchBox, areEqual);

export { SearchBoxMemo as SearchBox };
