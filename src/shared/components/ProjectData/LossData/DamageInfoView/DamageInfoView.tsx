import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import classes from './damageInfoView.module.css';

interface Props {
  damageCauseName: string;
  showCategorySection: boolean;
  selectedCategory: any;
  lossDate: string;
}

const DamageInfoView = ({ damageCauseName, showCategorySection, selectedCategory, lossDate }: Props) => (
  <ul className="list-group">
    <li className={`list-group-item ${classes.lossDataViewItem}`}>
      Cause of Damage:
      {damageCauseName ? (
        <span className={classes.label}>{damageCauseName}</span>
      ) : (
        <span className={classes.noDataText}>No Selected Cause of Damage</span>
      )}
    </li>
    {showCategorySection && (
      <li className={`list-group-item ${classes.lossDataViewItem}`}>
        Category of Damage:
        {selectedCategory ? (
          <span className={classes.label}>{selectedCategory}</span>
        ) : (
          <span className={classes.noDataText}>No Selected Category of Damage</span>
        )}
      </li>
    )}
    <li className={`list-group-item ${classes.lossDataViewItem}`}>
      Date of Loss:
      {lossDate ? (
        <span className={classes.label}>{lossDate}</span>
      ) : (
        <span className={classes.noDataText}>No Selected Date of Loss</span>
      )}
    </li>
  </ul>
);

const DamageInfoViewMemo = memo(DamageInfoView, areEqual);

export { DamageInfoViewMemo as DamageInfoView };
