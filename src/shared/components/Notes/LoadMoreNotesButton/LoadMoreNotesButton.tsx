import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { Button } from 'Components/Button';
import { Icon } from 'Components/Icons';

import classes from './loadMoreNotesButton.module.css';

interface Props {
  type?: string;
  totalNotes?: number;
  loadMoreNotesClick?: (e: any) => void;
}

const LoadMoreNotesButton = ({ type, totalNotes, loadMoreNotesClick }: Props) => (
  <Button className={classes.loadMoreButton} type="button" onClick={loadMoreNotesClick}>
    <span className="d-flex justify-content-bewtween align-items-center">
      {`${totalNotes} More ${type} - Load More `} <Icon type="caretdown" />
    </span>
  </Button>
);

LoadMoreNotesButton.defaultProps = {
  totalNotes: undefined,
  loadMoreNotesClick: undefined,
  type: 'Comments',
};
const LoadMoreNotesButtonMemo = memo(LoadMoreNotesButton, areEqual);

export { LoadMoreNotesButtonMemo as LoadMoreNotesButton };
