import React, { memo, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { EquipmentLogInfoModal } from 'Components/RocketDry';
import { useRocketDryFunctions } from 'Context/RocketDry';

const EquipmentLogInfoModalContainer = () => {
  const { isInfoModalOpen, setIsInfoModalOpen }: any = useRocketDryFunctions();

  const onCloseClick = useCallback(() => {
    setIsInfoModalOpen(false);
  }, []);

  return <EquipmentLogInfoModal isOpen={isInfoModalOpen} onCloseClick={onCloseClick} />;
};

const EquipmentLogInfoModalContainerMemo = memo(EquipmentLogInfoModalContainer, areEqual);

export { EquipmentLogInfoModalContainerMemo as EquipmentLogInfoModal };
