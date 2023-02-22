import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { CategoryTypeButton } from 'Components/RocketScan';

interface Props {
  id: number;
  name: string;
  selectedCategories?: any[];
  updateSelectedCategoriesOnClick?: (e: any) => void;
}

const CategoryItemContainer = ({ id, name, selectedCategories, updateSelectedCategoriesOnClick }: Props) => {
  const [isSelected, setIsSelected] = useState(false);

  // maintain active state if present in selectedCategories
  // make sure active state is false when selectedCategories is empty - eg. clear all clicked
  useEffect(() => {
    if (selectedCategories?.length > 0) {
      setIsSelected(selectedCategories.includes(id));
    } else {
      // for when Clear filter button is clicked
      setIsSelected(false);
    }
  }, [selectedCategories]);

  // select category for filter
  const onClickSelectCategory = useCallback(
    (e: any) => {
      e.preventDefault();

      const {
        target: { id },
      } = e;

      setIsSelected((prev) => !prev);
      updateSelectedCategoriesOnClick(+id);
    },
    [isSelected]
  );

  return <CategoryTypeButton id={id} name={name} isActive={isSelected} onButtonClick={onClickSelectCategory} />;
};

CategoryItemContainer.defaultProps = {
  selectedCategories: undefined,
  updateSelectedCategoriesOnClick: undefined,
};
const CategoryItemContainerMemo = memo(CategoryItemContainer, areEqual);

export { CategoryItemContainerMemo as CategoryItem };
