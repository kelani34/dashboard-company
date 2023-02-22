import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { PhotoCategories } from 'Components/User';
import { useDispatch, useSelector } from 'react-redux';
import { firstCompanyIdSelector } from 'Containers/Projects/selectors';
import { getCompanyPhotoCategories, setCompanyPhotoCategoriesUpdated } from 'Containers/Company/actions';
import {
  fetchingPhotoCategoriesSelector,
  photoCategoriesSelector,
  photoCategoriesUpdatedSelector,
} from 'Containers/Company/selectors';

const PhotoCategoriesContainer = () => {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);

  const companyId = useSelector(firstCompanyIdSelector, areEqual);
  const photoCategories = useSelector(photoCategoriesSelector, areEqual);
  const photoCategoriesUpdated = useSelector(photoCategoriesUpdatedSelector, areEqual);
  const fetching = useSelector(fetchingPhotoCategoriesSelector, areEqual);

  useEffect(() => {
    if (companyId && photoCategories.length === 0) {
      dispatch(getCompanyPhotoCategories(companyId));
    }
  }, [companyId, photoCategories]);

  const onEditButtonClick = useCallback(() => {
    setEditMode((prevState) => !prevState);
  }, [companyId]);

  useEffect(() => {
    if (photoCategoriesUpdated) {
      setEditMode(false);
      dispatch(getCompanyPhotoCategories(companyId));
      dispatch(setCompanyPhotoCategoriesUpdated(false));
    }
  }, [companyId, photoCategoriesUpdated]);

  return (
    <PhotoCategories
      fetching={fetching}
      editMode={editMode}
      photoCategories={photoCategories}
      onEditButtonClick={onEditButtonClick}
    />
  );
};

const PhotoCategoriesContainerMemo = memo(PhotoCategoriesContainer, areEqual);

export { PhotoCategoriesContainerMemo as PhotoCategoriesContainer };
