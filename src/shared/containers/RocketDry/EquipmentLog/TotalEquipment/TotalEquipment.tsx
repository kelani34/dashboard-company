import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useDispatch, useSelector } from 'react-redux';

import { TotalEquipment } from 'Components/RocketDry';
import { SpinnerBlock } from 'Components/SpinnerBlock';

import { getProjectEquipmentList } from 'Containers/RocketDry/actions';

import { projectSelector } from 'Containers/RocketScan/selectors';
import { projectEquipmentListSelector } from 'Containers/RocketDry/selectors';

import { chunkArray } from 'Utils/helpers';

const TotalEquipmentContainer = () => {
  const dispatch = useDispatch();

  // selectors
  const project = useSelector(projectSelector, areEqual);
  const projectEquipmentList = useSelector(projectEquipmentListSelector, areEqual);

  // local variables
  const [fetching, setFetching] = useState(false);
  const [equipmentListForDisplay, setEquipmentListForDisplay] = useState([]);

  const getReports = useCallback(() => {
    const { id: projectId } = project;

    dispatch(getProjectEquipmentList(projectId, setFetching));
  }, [project]);

  useEffect(() => {
    if (project?.id) {
      getReports();
    }
  }, [project]);

  useEffect(() => {
    if (projectEquipmentList) {
      const totalEquipmentList = projectEquipmentList.filter((equipment) => equipment?.count > 0);

      setEquipmentListForDisplay(chunkArray(totalEquipmentList, 2));
    }
  }, [projectEquipmentList]);

  return (
    <>
      <SpinnerBlock fetching={fetching} />
      {!fetching && <TotalEquipment equipmentList={equipmentListForDisplay} />}
    </>
  );
};

const TotalEquipmentContainerMemo = memo(TotalEquipmentContainer, areEqual);

export { TotalEquipmentContainerMemo as TotalEquipment };
