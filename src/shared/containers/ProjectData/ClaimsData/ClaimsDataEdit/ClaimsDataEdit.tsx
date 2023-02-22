import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { useClaimsDataFunctions } from 'Context/ClaimsData';
import { ClaimsDataEdit } from 'Components/ProjectData';
import { createClaim, updateClaim, getClaims } from '../actions';

const ClaimsDataEditContainer = () => {
  const dispatch = useDispatch();

  const { setEditIsOpen, project, claims, claimCreated, claimUpdated, setClaimCreated, setClaimUpdated }: any =
    useClaimsDataFunctions();

  const [claimId, setClaimId] = useState(0);
  const [policyHolder, setPolicyHolder] = useState('');
  const [representative, setRepresentative] = useState('');
  const [provider, setProvider] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [claimNumber, setClaimNumber] = useState('');
  const [projectId, setProjectId] = useState(project.id);

  useEffect(() => {
    if (project?.id) {
      const { id } = project;
      dispatch(getClaims(id));
      setProjectId(id);
    }
  }, [project]);

  useEffect(() => {
    if (claims.length > 0) {
      const [claim] = claims;
      const {
        id,
        policy_holder: policyHolder,
        representative,
        provider,
        policy_number: policyNumber,
        claim_number: claimNumber,
      } = claim;
      setClaimId(id);
      setPolicyHolder(policyHolder);
      setRepresentative(representative);
      setProvider(provider);
      setPolicyNumber(policyNumber);
      setClaimNumber(claimNumber);
    }
  }, [claims]);

  useEffect(() => {
    if (claimCreated || claimUpdated) {
      setEditIsOpen(false);
      dispatch(getClaims(projectId));
    }
    return () => {
      if (claimCreated || claimUpdated) {
        dispatch(setClaimCreated(false));
        dispatch(setClaimUpdated(false));
      }
    };
  }, [claimCreated, claimUpdated]);

  const onChangePolicyHolder = useCallback(({ target: { value } }) => {
    setPolicyHolder(value);
  }, []);

  const onChangeRepresentative = useCallback(({ target: { value } }) => {
    setRepresentative(value);
  }, []);

  const onChangeProvider = useCallback(({ target: { value } }) => {
    setProvider(value);
  }, []);

  const onChangePolicyNumber = useCallback(({ target: { value } }) => {
    setPolicyNumber(value);
  }, []);

  const onChangeClaimNumber = useCallback(({ target: { value } }) => {
    setClaimNumber(value);
  }, []);

  const onSaveButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();
      if (claims.length === 0) {
        dispatch(
          createClaim(projectId, {
            policy_holder: policyHolder,
            representative,
            provider,
            policy_number: policyNumber,
            claim_number: claimNumber,
            project_id: projectId,
          })
        );
      }
      if (claims.length > 0) {
        dispatch(
          updateClaim(claimId, {
            policy_holder: policyHolder,
            representative,
            provider,
            policy_number: policyNumber,
            claim_number: claimNumber,
            project_id: projectId,
          })
        );
      }
    },
    [policyHolder, representative, provider, policyNumber, claimNumber, projectId]
  );

  const onCancelButtonClick = useCallback((e: any) => {
    e.preventDefault();
    setEditIsOpen(false);
  }, []);

  return (
    <ClaimsDataEdit
      policyHolder={policyHolder}
      representative={representative}
      provider={provider}
      policyNumber={policyNumber}
      claimNumber={claimNumber}
      onChangePolicyHolder={onChangePolicyHolder}
      onChangeRepresentative={onChangeRepresentative}
      onChangeProvider={onChangeProvider}
      onChangePolicyNumber={onChangePolicyNumber}
      onChangeClaimNumber={onChangeClaimNumber}
      onSaveButtonClick={onSaveButtonClick}
      onCancelButtonClick={onCancelButtonClick}
    />
  );
};

ClaimsDataEditContainer.defaultProps = {};

const ClaimsDataEditContainerMemo = memo(ClaimsDataEditContainer, areEqual);

export { ClaimsDataEditContainerMemo as ClaimsDataEdit };
