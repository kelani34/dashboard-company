import React, { memo, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { CategoryRow } from 'Components/User';

interface Props {
  category: any;
  onCategoryRowClick: (e: any) => void;
}

const CategoryRowContainer = ({ category, onCategoryRowClick }: Props) => {
  const { id, name, enabled } = category;

  const onClick = useCallback(() => {
    onCategoryRowClick(id);
  }, []);

  return <CategoryRow name={name} enabled={enabled} onCategoryRowClick={onClick} />;
};

const CategoryRowContainerMemo = memo(CategoryRowContainer, areEqual);

export { CategoryRowContainerMemo as CategoryRowContainer };
