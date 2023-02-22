import React, { memo, useState, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { RocketDryBody, MoistureAtmosphericWrapper, EquipmentLog } from 'Components/RocketDry';
import { useRocketDryFunctions } from 'Context/RocketDry';

const RocketDryBodyContainer = () => {
  const moistureAtmosphericContent = <MoistureAtmosphericWrapper />;
  const equipmentLogContent = <EquipmentLog />;
  const [rocketDryContent, setRocketDryContent] = useState(moistureAtmosphericContent);

  const { setIsEquipmentFolder }: any = useRocketDryFunctions();

  const onEquipmentButtonClick = useCallback(() => {
    setIsEquipmentFolder(true);
    setRocketDryContent(equipmentLogContent);
  }, []);

  const onMoistureButtonClick = useCallback(() => {
    setIsEquipmentFolder(false);
    setRocketDryContent(moistureAtmosphericContent);
  }, []);

  return (
    <RocketDryBody
      onEquipmentButtonClick={onEquipmentButtonClick}
      onMoistureButtonClick={onMoistureButtonClick}
      content={rocketDryContent}
    />
  );
};

const RocketDryBodyContainerMemo = memo(RocketDryBodyContainer, areEqual);

export { RocketDryBodyContainerMemo as RocketDryBody };
