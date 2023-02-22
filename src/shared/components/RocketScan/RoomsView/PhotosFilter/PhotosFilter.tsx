import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';
import { Button, CancelButton, CategoryButton } from 'Components/Button';
import { CategoryList } from 'Containers/RocketScan';
import classes from './photosFilter.module.css';

interface Props {
  filterBookmarked?: boolean; // eslint-disable-line
  filterFlagged?: boolean; // eslint-disable-line
  selectedCategories?: any[];
  selectedCount: number;
  categoryFilterIsOpen: boolean;
  onClickBookmarkFilter?: (e: any) => void; // eslint-disable-line
  onClickFlaggedFilter?: (e: any) => void; // eslint-disable-line
  onClickCategoryFilterIsOpen?: (e: any) => void;
  onClickClearSelectedCategories?: (e: any) => void;
}

const PhotosFilter = ({
  filterBookmarked,
  filterFlagged,
  selectedCategories,
  selectedCount,
  categoryFilterIsOpen,
  onClickBookmarkFilter,
  onClickFlaggedFilter,
  onClickCategoryFilterIsOpen,
  onClickClearSelectedCategories,
}: Props) => (
  <>
    <div className={classes.photosFilter}>
      Filters
      <Button
        className={`d-none ${classes.filterButton} ${filterFlagged ? classes.active : ''}`}
        onClick={onClickFlaggedFilter}
      >
        <Icon type="flag" />
      </Button>
      <Button
        className={`d-none ${classes.filterButton} ${filterBookmarked ? classes.active : ''}`}
        onClick={onClickBookmarkFilter}
      >
        <Icon type="bookmark" />
      </Button>
      <CategoryButton
        selectedCount={selectedCount}
        isOpen={categoryFilterIsOpen}
        onClick={onClickCategoryFilterIsOpen}
      />
      {selectedCategories?.length > 0 && (
        <CancelButton className={classes.clearCatagoriesButton} onClick={onClickClearSelectedCategories}>
          <Icon type="modalclose" />
          Clear Filter
        </CancelButton>
      )}
    </div>
    <div className={`d-flex flex-wrap justify-content-start align-items-center ${classes.categoryButtonsList}`}>
      <CategoryList categoryFilterIsOpen={categoryFilterIsOpen} />
    </div>
  </>
);
PhotosFilter.defaultProps = {
  filterBookmarked: undefined,
  filterFlagged: undefined,
  selectedCategories: undefined,
  onClickCategoryFilterIsOpen: undefined,
  onClickClearSelectedCategories: undefined,
  onClickBookmarkFilter: undefined,
  onClickFlaggedFilter: undefined,
};
const PhotosFilterMemo = memo(PhotosFilter, areEqual);

export { PhotosFilterMemo as PhotosFilter };
