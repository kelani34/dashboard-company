import { Button } from "Components/Button";
import React, { memo } from "react";

import { areEqual } from "Utils/equalityChecks";
import classes from "./photo.filter.module.css";

interface Props {
  allPhotos: boolean;
  damageAssessment: boolean;
  dailyProgress: boolean;
  preExistingDamages: boolean;
  onClick: (e: any) => void;
}
const PhotoFilter = ({ allPhotos, damageAssessment, dailyProgress, preExistingDamages, onClick }: Props) => (
  <div className={classes.container} role="toolbar" aria-label="Toolbar with button groups">
    <div className={`${classes["button-group"]} me-2`} role="group" aria-label="First group">
      <Button
        id="allPhotos"
        onClick={onClick}
        type="button"
        className={`btn ${classes.allPhotos} ${classes.filterButton} ${classes.leftEndilterButton} ${
          damageAssessment ? classes.rightBorderUnset : ""
        } ${allPhotos ? `${classes.leftEndFilterButtonSelected} ${classes.selected}` : ""}`}
      >
        All Photos
      </Button>
      <Button
        id="damageAssessment"
        onClick={onClick}
        type="button"
        className={`btn ${classes.damageAssessment} ${classes.filterButton} ${
          allPhotos ? classes.leftBorderUnset : ""
        } ${dailyProgress ? classes.rightBorderUnset : ""} ${
          damageAssessment
            ? `${classes.middleButtonSelected} ${classes.selected}`
            : `${classes.middleButton} ${classes.middelButtonUnselected}`
        }`}
      >
        Damage Assessment
      </Button>
      <Button
        id="dailyProgress"
        onClick={onClick}
        type="button"
        className={`btn ${classes.dailyProgress} ${classes.filterButton} ${
          dailyProgress
            ? `${classes.middleButtonSelected} ${classes.selected}`
            : `${classes.middleButton} ${classes.middelButtonUnselected}`
        }`}
      >
        Daily Progress
      </Button>
      <Button
        id="preExistingDamages"
        onClick={onClick}
        type="button"
        className={`btn ${classes.preExistingDamages} ${classes.filterButton} ${classes.rightEndFilterButton} ${
          dailyProgress ? classes.leftBorderUnset : ""
        } ${preExistingDamages ? `${classes.rightndFilterButtonSelected} ${classes.selected}` : ""}`}
      >
        Pre-Existing Damages
      </Button>
    </div>
  </div>
);

const PhotoFilterMemo = memo(PhotoFilter, areEqual);
export { PhotoFilterMemo as PhotoFilter };
