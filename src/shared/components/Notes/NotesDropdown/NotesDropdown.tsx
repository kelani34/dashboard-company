import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { Button } from 'Components/Button';
import { Icon } from 'Components/Icons';

import classes from './notesDropdown.module.css';

interface Props {
  children: ReactNode;
  type: string;
  placeholder?: string;
  isOpen: boolean;
  totalNoteCount?: number;
  hasBookmarked?: boolean;
  hasFlagged?: boolean;
  onToggleClick?: (e: any) => void;
}

const NotesDropdown = ({
  children,
  type,
  placeholder,
  isOpen,
  totalNoteCount,
  hasBookmarked,
  hasFlagged,
  onToggleClick,
}: Props) => (
  <div className={`${classes.notesDropdown}`}>
    <div className="accordion" id={`accordion-${type}`}>
      <div className={`accordion-item ${classes.itemWrapper}`}>
        <div className="accordion-header d-flex justify-content-between align-items-center" id={`${type}-heading`}>
          <div className={`d-flex justify-content-between align-items-center ${classes.placeholderArea}`}>
            <div className={classes.placeholderText}>{!isOpen && <span>{`${placeholder}`}</span>}</div>
            {!isOpen && (
              <div className={`d-flex justify-content-between align-items-center ${classes.placeholderInfo}`}>
                <div className={classes.noteCountText}>{`${totalNoteCount} Notes`}</div>
                {hasFlagged && <Icon className={classes.noteMarkerIcon} type="flagpurple" />}
                {hasBookmarked && <Icon className={classes.noteMarkerIcon} type="bookmarkpurple" />}
              </div>
            )}
          </div>

          <Button
            className={`accordion-button collapsed  ${isOpen ? `${classes.openState}` : ''} ${classes.buttonOverride}`}
            type="button"
            data-bs-target={`#notesWrapperBody-${type}`}
            aria-expanded="true"
            aria-controls={`notesWrapperBody-${type}`}
            onClick={onToggleClick}
          />
        </div>
        <div
          id={`notesWrapperBody-${type}`}
          className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
          aria-labelledby={`${type}-heading`}
          data-bs-parent={`accordion-${type}`}
        >
          <div className={`accordion-body ${classes.bodyOverride}`}>{children}</div>
        </div>
      </div>
    </div>
  </div>
);

NotesDropdown.defaultProps = {
  placeholder: undefined,
  totalNoteCount: undefined,
  onToggleClick: undefined,
  hasBookmarked: undefined,
  hasFlagged: undefined,
};
const NotesDropdownMemo = memo(NotesDropdown, areEqual);

export { NotesDropdownMemo as NotesDropdown };
