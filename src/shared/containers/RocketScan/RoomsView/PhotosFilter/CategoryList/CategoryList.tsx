import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { CategoryItem } from 'Containers/RocketScan';

import { setSelectedCategories } from 'Containers/RocketScan/actions';
import { albumTypesSelector, selectedCategoriesSelector } from 'Containers/RocketScan/selectors';

interface Props {
  categoryFilterIsOpen: boolean;
}

const CategoryListContainer = ({ categoryFilterIsOpen }: Props) => {
  const dispatch = useDispatch();

  /// used to populate the list with available options
  const categories = useSelector(albumTypesSelector, areEqual);
  // shows selected category id's, if any have been chosen
  const selectedCategories = useSelector(selectedCategoriesSelector, areEqual);

  const updateSelectedCategoriesOnClick = useCallback(
    (id: number) => {
      dispatch(setSelectedCategories(id));
    },
    [selectedCategories]
  );
  return (
    <>
      {categoryFilterIsOpen &&
        categories?.length > 0 &&
        categories.map((category: any) => (
          <CategoryItem
            key={category.id}
            id={category.id}
            name={category.name}
            selectedCategories={selectedCategories}
            updateSelectedCategoriesOnClick={updateSelectedCategoriesOnClick}
          />
        ))}
    </>
  );
};

const CategoryListContainerMemo = memo(CategoryListContainer, areEqual);

export { CategoryListContainerMemo as CategoryList };
