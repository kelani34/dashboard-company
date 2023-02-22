import { Button } from 'Components/Button';
import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import classes from './photoFileSizeMenu.module.css';

interface Props {
  selectedSize: string;
  onClick: (e: any) => void;
}
const PhotoFileSizeMenu = ({ selectedSize, onClick }: Props) => (
  <div className={classes.container} role="toolbar" aria-label="Toolbar with button groups">
    <div className={`${classes['button-group']}`} role="group" aria-label="First group">
      <Button
        id="full"
        onClick={onClick}
        type="button"
        className={`btn ${classes.sizeButton} ${classes.leftEndSizeButton} ${
          selectedSize === 'thumbnail' ? classes.rightBorderUnset : ''
        } ${selectedSize === 'full' ? `${classes.selected}` : ''}`}
      >
        Full Size
      </Button>
      <Button
        id="thumbnail"
        onClick={onClick}
        type="button"
        className={`btn ${classes.sizeButton} ${classes.middleSizeButton} ${
          selectedSize === 'full' ? classes.leftBorderUnset : ''
        } ${selectedSize === 'both' ? classes.rightBorderUnset : ''} ${
          selectedSize === 'thumbnail' ? `${classes.selected}` : ''
        }`}
      >
        Compressed
      </Button>

      <Button
        id="both"
        onClick={onClick}
        type="button"
        className={`btn ${classes.sizeButton} ${classes.rightEndSizeButton} ${
          selectedSize === 'both' ? classes.leftBorderUnset : ''
        } ${selectedSize === 'both' ? `${classes.selected}` : ''}`}
      >
        Both
      </Button>
    </div>
  </div>
);

const PhotoFileSizeMenuMemo = memo(PhotoFileSizeMenu, areEqual);
export { PhotoFileSizeMenuMemo as PhotoFileSizeMenu };
