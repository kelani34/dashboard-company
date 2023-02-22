import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { PhotosFilter } from 'Components/RocketScan';
import { setSelectedCategories } from 'Containers/RocketScan/actions';
import { selectedCategoriesSelector } from 'Containers/RocketScan/selectors';

const PhotosFilterContainer = () => {
  const dispatch = useDispatch();

  const [filterBookmarked, setFilterBookmarked] = useState(false); // to be replaced by redux
  const [filterFlagged, setFilterFlagged] = useState(false); // to be replaced by redux
  const [categoryFilterIsOpen, setCategoryFilterIsOpen] = useState(false);

  const selectedCategories = useSelector(selectedCategoriesSelector, areEqual);

  const onClickBookmarkFilter = useCallback(() => {
    setFilterBookmarked((prev) => !prev);
  }, []);

  const onClickFlaggedFilter = useCallback(() => {
    setFilterFlagged((prev) => !prev);
  }, []);

  const onClickCategoryFilterIsOpen = useCallback(() => {
    setCategoryFilterIsOpen((prev) => !prev);
  }, []);

  const onClickClearSelectedCategories = useCallback((e: any) => {
    e.preventDefault();
    dispatch(setSelectedCategories([]));
  }, []);

  return (
    <PhotosFilter
      filterBookmarked={filterBookmarked}
      filterFlagged={filterFlagged}
      onClickBookmarkFilter={onClickBookmarkFilter}
      onClickFlaggedFilter={onClickFlaggedFilter}
      selectedCategories={selectedCategories}
      selectedCount={selectedCategories?.length}
      categoryFilterIsOpen={categoryFilterIsOpen}
      onClickCategoryFilterIsOpen={onClickCategoryFilterIsOpen}
      onClickClearSelectedCategories={onClickClearSelectedCategories}
    />
  );
};

const PhotosFilterContainerMemo = memo(PhotosFilterContainer, areEqual);

export { PhotosFilterContainerMemo as PhotosFilter };
