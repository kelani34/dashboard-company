import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';

import { DamagedMaterialToast } from 'Components/RocketScan/RoomsView/DamagedMaterialToast';

import {
  customDamagedMaterialUpdatedSelector,
  customDamagedMaterialDeletedSelector,
} from 'Containers/RocketScan/RoomsView/DamagedMaterials/selectors';

const DamagedMaterialToastContainer = () => {
  // local state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // selectors
  const customDamagedMaterialUpdated = useSelector(customDamagedMaterialUpdatedSelector, areEqual);
  const customDamagedMaterialDeleted = useSelector(customDamagedMaterialDeletedSelector, areEqual);

  const closeToast = useCallback(() => {
    if (showToast) {
      setShowToast(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (showToast) {
      // Close it if it's showing.
      setTimeout(() => {
        closeToast();
      }, 3000);
    }
  }, [showToast]);

  useEffect(() => {
    if (customDamagedMaterialUpdated) {
      setToastMessage('Damaged Material Changed');
      setShowToast(true);
    }
  }, [customDamagedMaterialUpdated]);

  useEffect(() => {
    if (customDamagedMaterialDeleted) {
      setToastMessage('Damaged Material Deleted');
      setShowToast(true);
    }
  }, [customDamagedMaterialDeleted]);

  return <DamagedMaterialToast isDisplayed={showToast} closeToast={closeToast} message={toastMessage} />;
};

const DamagedMaterialToastContainerMemo = memo(DamagedMaterialToastContainer, areEqual);
export { DamagedMaterialToastContainerMemo as DamagedMaterialToast };
