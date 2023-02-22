import React, { memo, useCallback, useEffect, useState } from 'react';
import { EditPhotoCategories } from 'Components/User';
import { areEqual } from 'Utils/equalityChecks';
import { useDispatch } from 'react-redux';
import { updateCompanyPhotoCategories } from 'Containers/Company/actions';

interface Props {
  photoCategories: any[];
  onEditButtonClick: (e: any) => void;
}

const EditPhotoCategoriesContainer = ({ photoCategories, onEditButtonClick }: Props) => {
  const dispatch = useDispatch();

  const [fetching, setFetching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setCategories(photoCategories);
  }, []);

  const onCategoryRowClick = useCallback(
    (id: number) => {
      setCategories((prevItems) =>
        prevItems.map((item: any) => {
          if (item.id === id) {
            return {
              ...item,
              enabled: !item.enabled,
            };
          }

          return item;
        })
      );
    },
    [categories]
  );

  const onSaveButtonClick = useCallback(() => {
    if (!categories.some(({ enabled }: any) => enabled === true)) {
      setShowError(true);
    } else {
      setShowError(false);
      dispatch(updateCompanyPhotoCategories(categories, setFetching));
    }
  }, [categories]);

  return (
    <EditPhotoCategories
      fetching={fetching}
      categories={categories}
      showError={showError}
      onCategoryRowClick={onCategoryRowClick}
      onEditButtonClick={onEditButtonClick}
      onSaveButtonClick={onSaveButtonClick}
    />
  );
};

const EditPhotoCategoriesContainerMemo = memo(EditPhotoCategoriesContainer, areEqual);

export { EditPhotoCategoriesContainerMemo as EditPhotoCategoriesContainer };
