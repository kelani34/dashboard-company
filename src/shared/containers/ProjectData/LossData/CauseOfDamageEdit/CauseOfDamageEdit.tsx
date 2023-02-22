import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { useLossDataFunctions } from 'Context/LossData';
import { listProjectDamageCauses } from 'Containers/ProjectData/LossData/actions';

import { CauseOfDamageEdit } from 'Components/ProjectData';

const CauseOfDamageEditContainer = () => {
  const dispatch = useDispatch();
  const {
    project,
    projectDamageCauses,
    selectedDamageTypes,
    selectedDamageCause,
    selectedDamageCauseId,
    setSelectedDamageCauseId,
  }: any = useLossDataFunctions();

  const [damageCauseOptions, setDamageCauseOptions] = useState([]);
  const [selectedDamageCauseName, setSelectedDamageCauseName] = useState('');

  // fill dropdown with causes
  useEffect(() => {
    if (projectDamageCauses?.length > 0) {
      setDamageCauseOptions(projectDamageCauses);
    }
  }, [projectDamageCauses]);

  useEffect(() => {
    if (project?.id) {
      const selectedDamageTypeIds = selectedDamageTypes.map((type) => type.id).toString();
      dispatch(listProjectDamageCauses(project.id, selectedDamageTypeIds));
    }
  }, [selectedDamageTypes, project]);

  // get damage cause name given the id
  useEffect(() => {
    if (selectedDamageCauseId) {
      const selectedCause = damageCauseOptions.find((cause) => cause.id === selectedDamageCauseId);
      if (selectedCause?.name) {
        setSelectedDamageCauseName(selectedCause.name);
      }
    }
  }, [selectedDamageCauseId, damageCauseOptions]);

  // set selected id after retrieving damage cause from property data
  useEffect(() => {
    if (selectedDamageCause?.id) {
      setSelectedDamageCauseId(selectedDamageCause.id);
    }
  }, [selectedDamageCause]);

  return (
    <CauseOfDamageEdit
      damageCauseOptions={damageCauseOptions}
      selectedDamageCauseId={selectedDamageCauseId}
      selectedDamageCauseName={selectedDamageCauseName}
      setSelectedDamageCause={setSelectedDamageCauseId}
    />
  );
};

const CauseOfDamageContainerMemo = memo(CauseOfDamageEditContainer, areEqual);

export { CauseOfDamageContainerMemo as CauseOfDamageEdit };
