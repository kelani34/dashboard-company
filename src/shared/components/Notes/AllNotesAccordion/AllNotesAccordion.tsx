import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { Button } from 'Components/Button';
import { Icon } from 'Components/Icons';
import classes from './allNotesAccordion.module.css';

interface Props {
  children: ReactNode;
  id: number;
  icon?: string;
  type: string;
  title: string;
  totalNoteCount: number;
  isOpen: boolean;
  onToggleClick?: (e: any) => void;
}

const AllNotesAccordion = ({ children, id, icon, type, title, isOpen, totalNoteCount, onToggleClick }: Props) => (
  <div className={`${classes.allNotesAccordion}`}>
    <div className="accordion" id={`accordion-${type}-${id}`}>
      <div className={`accordion-item ${classes.itemWrapper} ${isOpen ? classes.itemWrapperOpened : ''}`}>
        <div
          className={`accordion-header d-flex justify-content-between align-items-center ${classes.notesHeader} ${
            isOpen ? `${classes.headerOpen}` : ''
          }`}
          id={`${type}-${id}-heading`}
        >
          <div className={`d-flex justify-content-start align-items-center ${classes.titleArea}`}>
            <Icon type={icon} />
            <div className={classes.title}>{title}</div>
          </div>

          {!isOpen && <div className={`${classes.noteCountText}`}>{`${totalNoteCount} Notes`}</div>}

          <Button
            className={`accordion-button collapsed  ${isOpen ? `${classes.openState}` : ''} ${classes.buttonOverride}`}
            type="button"
            data-bs-target={`#notesWrapperBody-${type}-${id}`}
            aria-expanded="true"
            aria-controls={`notesWrapperBody-${type}-${id}`}
            onClick={onToggleClick}
          />
        </div>
        <div
          id={`notesWrapperBody-${type}-${id}`}
          className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
          aria-labelledby={`${type}-${id}-heading`}
          data-bs-parent={`accordion-${type}-${id}`}
        >
          <div className={`accordion-body ${classes.bodyOverride}`}>{children}</div>
        </div>
      </div>
    </div>
  </div>
);

AllNotesAccordion.defaultProps = {
  icon: undefined,
  onToggleClick: undefined,
};
const AllNotesAccordionMemo = memo(AllNotesAccordion, areEqual);

export { AllNotesAccordionMemo as AllNotesAccordion };
