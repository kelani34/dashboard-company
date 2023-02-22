import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { UnitClaimsLocation } from 'Components/ProjectData/ClaimsData/UnitClaims';
import { useDispatch } from 'react-redux';
import { listLocationClaims, setLocationClaimCreated } from 'Containers/RocketScan/MultiUnit/Locations/actions';
import { useClaimsDataFunctions } from 'Context/ClaimsData';
import { setClaimDeleted, setClaimUpdated } from '../../actions';

interface Props {
  unit: any;
}

const UnitClaimsLocationContainer = ({ unit }: Props) => {
  const dispatch = useDispatch();
  const mounted = useRef(false);

  const { claimUpdated, unitClaimCreated, claimDeleted }: any = useClaimsDataFunctions();

  const { id, name } = unit;

  const [initialLoad, setInitialLoad] = useState(false);
  const [claims, setClaims] = useState([]);

  const getClaims = useCallback(
    async (locationId: number) => {
      const response: any = await dispatch(listLocationClaims(locationId));

      if (response?.data && mounted.current) {
        const { data } = response;
        setClaims(data);
        setInitialLoad(true);
      }
    },
    [mounted]
  );

  useEffect(() => {
    mounted.current = true;
    if (!initialLoad && mounted.current) {
      (async function fetchData() {
        await getClaims(id);
      })();
    }

    return () => {
      mounted.current = false;
    };
  }, [initialLoad]);

  useEffect(() => {
    if (claimUpdated || unitClaimCreated || claimDeleted) {
      getClaims(id);
    }
    return () => {
      if (claimUpdated || unitClaimCreated || claimDeleted) {
        dispatch(setClaimUpdated(false));
        dispatch(setLocationClaimCreated(false));
        dispatch(setClaimDeleted(false));
      }
    };
  }, [claimUpdated, unitClaimCreated, claimDeleted]);

  return <UnitClaimsLocation unit={unit} unitName={name} claims={claims} />;
};

const UnitClaimsLocationContainerMemo = memo(UnitClaimsLocationContainer, areEqual);

export { UnitClaimsLocationContainerMemo as UnitClaimsLocation };
