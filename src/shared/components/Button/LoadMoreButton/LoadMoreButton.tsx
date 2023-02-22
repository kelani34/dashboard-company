import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { Button } from 'Components/Button';
import { Icon } from 'Components/Icons';

import classes from './loadMoreButton.module.css';

interface Props {
  type: string;
  totalItems?: number;
  loadMoreItemsClick?: (e: any) => void;
}

const LoadMoreButton = ({ type, totalItems, loadMoreItemsClick }: Props) => (
  <Button className={classes.loadMoreButton} type="button" onClick={loadMoreItemsClick}>
    <span className="d-flex justify-content-bewtween align-items-center">
      {`${totalItems} More ${type} - Load More `} <Icon type="caretdown" />
    </span>
  </Button>
);

LoadMoreButton.defaultProps = {
  totalItems: undefined,
  loadMoreItemsClick: undefined,
};
const LoadMoreButtonMemo = memo(LoadMoreButton, areEqual);

export { LoadMoreButtonMemo as LoadMoreButton };
