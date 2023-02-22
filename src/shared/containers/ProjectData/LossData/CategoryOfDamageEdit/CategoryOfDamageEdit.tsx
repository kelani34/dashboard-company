import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { CategoryOfDamageEdit } from 'Components/ProjectData';
import { useLossDataFunctions } from 'Context/LossData';

const CategoryOfDamageEditContainer = () => {
  const { selectedDamageCategory, setSelectedDamageCategory }: any = useLossDataFunctions();

  const damageCategories = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
  ];

  return (
    <CategoryOfDamageEdit
      categories={damageCategories}
      selectedCategory={selectedDamageCategory}
      setSelectedCategory={setSelectedDamageCategory}
    />
  );
};

const CategoryOfDamageEditContainerMemo = memo(CategoryOfDamageEditContainer, areEqual);

export { CategoryOfDamageEditContainerMemo as CategoryOfDamageEdit };
