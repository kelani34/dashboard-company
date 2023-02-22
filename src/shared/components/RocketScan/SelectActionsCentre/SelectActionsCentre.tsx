import React, { memo } from 'react';
import { Icon } from 'Components/Icons';
import { PillButton } from 'Components/PillButton';
import { areEqual } from 'Utils/equalityChecks';
import classes from './selectActionsCentre.module.css';

interface Props {
  photoCount?: number;
  isOpen?: boolean;
  shareSelectionClick?: (e: any) => void;
  deleteSelectionClick?: (e: any) => void;
  onSelectAllClick?: (e: any) => void;
  onSelectButtonClick?: (e: any) => void;
}

const SelectActionsCentre = ({
  photoCount,
  isOpen,
  shareSelectionClick,
  deleteSelectionClick,
  onSelectAllClick,
  onSelectButtonClick,
}: Props) => (
  <>
    {!isOpen ? (
      <PillButton className={classes.selectButton} onClick={onSelectButtonClick}>
        Select
      </PillButton>
    ) : (
      <div className={`d-flex justify-content-between align-items-center ${classes.actionCentre}`}>
        <div className={classes.photoCount}>{photoCount}</div>
        <Icon type="landscape" />
        <span className={classes.pipeDivider}>|</span>
        <Icon type="share" onClick={shareSelectionClick} />
        {/* Flag and Bookmark for future use */}
        {/* <Icon type="flagoutlinepurple" onClick={() => {}} />
    <Icon type="bookmarkoutlinepurple" onClick={() => {}} /> */}
        <Icon type="trashmd" onClick={deleteSelectionClick} />
        <PillButton className={classes.selectAllButton} onClick={onSelectAllClick}>
          Select All
        </PillButton>
        <PillButton className={classes.cancelSelectionButton} onClick={onSelectButtonClick}>
          Cancel
        </PillButton>
      </div>
    )}
  </>
);

SelectActionsCentre.defaultProps = {
  photoCount: undefined,
  isOpen: undefined,
  shareSelectionClick: undefined,
  deleteSelectionClick: undefined,
  onSelectAllClick: undefined,
  onSelectButtonClick: undefined,
};
const SelectActionsCentreMemo = memo(SelectActionsCentre, areEqual);

export { SelectActionsCentreMemo as SelectActionsCentre };
