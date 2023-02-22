import React, { memo } from 'react';

import { Icon } from 'Components/Icons';
import { areEqual } from 'Utils/equalityChecks';

import classes from './noteHeader.module.css';

interface Props {
  postedByName: string;
  datePosted: string;
  canModify: boolean;
  bookmarked: boolean;
  flagged: boolean;
  onClickFlagIcon: (e: any) => void;
  onClickBookmarkIcon: (e: any) => void;
  onClickEditIcon: (e: any) => void;
  onClickDeleteIcon: (e: any) => void;
}

const NoteHeader = ({
  postedByName,
  datePosted,
  canModify,
  bookmarked,
  flagged,
  onClickFlagIcon,
  onClickBookmarkIcon,
  onClickEditIcon,
  onClickDeleteIcon,
}: Props) => (
  <div className={`d-flex justify-content-between align-items-start ${classes.noteHeader}`}>
    <div>
      <div className={classes.name}>{postedByName}</div>
      <div className={classes.datePosted}>{datePosted}</div>
    </div>
    {canModify && (
      <div className="d-flex justify-content-end">
        <div className={classes.editIcon}>
          <Icon type={flagged ? 'flagpurple' : 'flag'} onClick={onClickFlagIcon} />
        </div>
        <div className={classes.editIcon}>
          <Icon type={bookmarked ? 'bookmarkpurple' : 'bookmark'} onClick={onClickBookmarkIcon} />
        </div>
        <div className={classes.editIcon}>
          <Icon type="editmd" onClick={onClickEditIcon} />
        </div>
        <div>
          <Icon type="trashsmdark" onClick={onClickDeleteIcon} />
        </div>
      </div>
    )}
  </div>
);

const NoteHeaderMemo = memo(NoteHeader, areEqual);

export { NoteHeaderMemo as NoteHeader };
