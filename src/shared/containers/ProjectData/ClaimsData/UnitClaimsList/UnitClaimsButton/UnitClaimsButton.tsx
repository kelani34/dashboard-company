import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { UnitClaimsButton } from 'Components/ProjectData/ClaimsData/UnitClaims';
import { useClaimsDataFunctions } from 'Context/ClaimsData';

interface Props {
  unit: any;
  claim: any;
}

const UnitClaimsButtonContainer = ({ unit, claim }: Props) => {
  const { onUnitClaimButtonClick }: any = useClaimsDataFunctions();

  const [claimTypeName, setClaimTypeName] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [claimNumber, setclaimNumber] = useState('');

  useEffect(() => {
    if (claim?.id) {
      const { claim_type: claimType, policy_number: policyNumber, claim_number: claimNumber } = claim;
      setPolicyNumber(policyNumber);
      setclaimNumber(claimNumber);
      setClaimTypeName(claimType?.name);
    }
  }, [claim]);

  const onClaimButtonClick = useCallback(() => {
    onUnitClaimButtonClick(unit, claim);
  }, [claim]);

  return (
    <UnitClaimsButton
      claimType={claimTypeName}
      policyNumber={policyNumber}
      claimNumber={claimNumber}
      onClaimButtonClick={onClaimButtonClick}
    />
  );
};

const UnitClaimsButtonContainerMemo = memo(UnitClaimsButtonContainer, areEqual);

export { UnitClaimsButtonContainerMemo as UnitClaimsButton };
