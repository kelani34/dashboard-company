import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { UnitClaimsList } from 'Components/ProjectData/ClaimsData/UnitClaims';

import { useClaimsDataFunctions } from 'Context/ClaimsData';

const UnitClaimsListContainer = () => {
  const { onAddUnitButtonClick, locations }: any = useClaimsDataFunctions();

  return <UnitClaimsList units={locations} onAddUnitButtonClick={onAddUnitButtonClick} />;
};

const UnitClaimsListContainerMemo = memo(UnitClaimsListContainer, areEqual);

export { UnitClaimsListContainerMemo as UnitClaimsList };
