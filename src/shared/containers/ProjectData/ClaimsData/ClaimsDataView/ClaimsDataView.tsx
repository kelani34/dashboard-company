import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { ClaimsDataView } from 'Components/ProjectData';
import { useClaimsDataFunctions } from 'Context/ClaimsData';
import { getClaims } from '../actions';

const ClaimsDataViewContainer = () => {
  const dispatch = useDispatch();
  const { project, claims }: any = useClaimsDataFunctions();

  const [policyHolder, setPolicyHolder] = useState('');
  const [representative, setRepresentative] = useState('');
  const [provider, setProvider] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [claimNumber, setClaimNumber] = useState('');

  useEffect(() => {
    if (project?.id) {
      const { id } = project;
      dispatch(getClaims(id));
    }
  }, [project]);

  useEffect(() => {
    if (claims.length > 0) {
      const [claim] = claims;
      const {
        policy_holder: policyHolder,
        representative,
        provider,
        policy_number: policyNumber,
        claim_number: claimNumber,
      } = claim;
      setPolicyHolder(policyHolder);
      setRepresentative(representative);
      setProvider(provider);
      setPolicyNumber(policyNumber);
      setClaimNumber(claimNumber);
    }
  }, [claims]);

  return (
    <ClaimsDataView
      policyHolder={policyHolder}
      representative={representative}
      provider={provider}
      policyNumber={policyNumber}
      claimNumber={claimNumber}
    />
  );
};

const ClaimsDataViewContainerMemo = memo(ClaimsDataViewContainer, areEqual);

export { ClaimsDataViewContainerMemo as ClaimsDataView };
