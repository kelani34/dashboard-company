import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';
import classes from './notesPlaceholder.module.css';

interface Props {
  allNotes: number;
  children: ReactNode;
}

const NotesPlaceholder = ({ allNotes, children }: Props) => (
  <div className={`${classes.emptyNotesPlaceholderBase}`}>
    <div className="d-flex flex-column p-0 px-4 w-100">
      <div className={`d-flex flex-row justify-content-start align-items-center w-100 ${classes.header}`}>
        <div className={classes.imageWrapper}>
          <Icon type="singlehome" className={classes.projectIcon} />
        </div>
        <h2 className={classes.projectText}>Project</h2>
      </div>
      {allNotes === 0 && (
        <div className={classes.noProjects}>
          <p>No notes in project. All notes in project will show here</p>
          <Icon type="rocketemblem" />
        </div>
      )}
      {children}
    </div>
  </div>
);

const NotesPlaceholderMemo = memo(NotesPlaceholder, areEqual);

export { NotesPlaceholderMemo as NotesPlaceholder };
