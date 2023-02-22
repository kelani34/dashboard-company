import React, { memo, useCallback, useEffect, useState } from "react";

import { areEqual } from "Utils/equalityChecks";
import { PhotoFilter } from "Components/PhotoFilter";
import { setSelectedPhotoFilter } from "Containers/Project/Unit/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectedPhotoFilterSelector } from "Containers/Project/Unit/selector";

// We will re-used this in the onClick event
const checkedObject = {
  allPhotos: false,
  damageAssessment: false,
  dailyProgress: false,
  preExistingDamages: false,
};

const PhotoFilterContainer = () => {
  const dispatch = useDispatch();

  const selectedPhotoFilter = useSelector(selectedPhotoFilterSelector, areEqual);

  const [checked, setChecked] = useState({
    allPhotos: true,
    damageAssessment: false,
    dailyProgress: false,
    preExistingDamages: false,
  });

  useEffect(() => {
    const updatedCheckedObject = { ...checkedObject };

    updatedCheckedObject[selectedPhotoFilter] = true;

    setChecked(updatedCheckedObject);
  }, [selectedPhotoFilter]);

  const onClick = useCallback((e: any) => {
    const { id } = e.target;
    dispatch(setSelectedPhotoFilter(id));
  }, []);

  return (
    <PhotoFilter
      onClick={onClick}
      allPhotos={checked.allPhotos}
      damageAssessment={checked.damageAssessment}
      dailyProgress={checked.dailyProgress}
      preExistingDamages={checked.preExistingDamages}
    />
  );
};

const PhotoFilterContainerMemo = memo(PhotoFilterContainer, areEqual);
export { PhotoFilterContainerMemo as PhotoFilter };
