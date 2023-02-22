import { Button } from 'Components/Button';
import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import classes from './photo.filter.module.css';

interface Props {
  albumTypes: any[];
  selected: number;
  onClick: (e: any) => void;
}
const PhotoFilter = ({ albumTypes, selected, onClick }: Props) => (
  <div className={classes.container} role="toolbar" aria-label="Toolbar with button groups">
    <div className={`${classes['button-group']} me-2`} role="group" aria-label="First group">
      {albumTypes.length > 0 && (
        <Button
          id="0"
          onClick={onClick}
          type="button"
          className={`btn ${classes.buttons} ${classes.allPhotos} ${classes.filterButtonBase} ${
            classes.leftEndFilterButton
          }
        ${selected === 0 ? `${classes.leftEndFilterButtonSelected} ${classes.selected}` : ''}`}
        >
          All Photos
        </Button>
      )}

      {albumTypes.map((type) => (
        <Button
          key={type.id}
          id={type.id}
          onClick={onClick}
          type="button"
          className={`btn ${classes.buttons} ${classes.filterButtonBase} ${classes.filterButton}
        ${
          selected === type.id
            ? `${classes.filterButtonSelected} ${classes.selected}`
            : `${classes.filterButtonUnselected}`
        }`}
        >
          {type.name}
        </Button>
      ))}
    </div>
  </div>
);

const PhotoFilterMemo = memo(PhotoFilter, areEqual);
export { PhotoFilterMemo as PhotoFilter };
