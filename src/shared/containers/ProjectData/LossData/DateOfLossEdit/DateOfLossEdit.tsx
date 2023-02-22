import React, { memo, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { DateOfLossEdit } from 'Components/ProjectData';

import { useLossDataFunctions } from 'Context/LossData';

const DateOfLossEditContainer = () => {
  const { selectedLossDate, setSelectedLossDate }: any = useLossDataFunctions();

  const onLossDateChange = useCallback((date) => {
    setSelectedLossDate(date);
  }, []);

  return <DateOfLossEdit lossDate={selectedLossDate} onLossDateChange={onLossDateChange} />;
};

const DateOfLossEditContainerMemo = memo(DateOfLossEditContainer, areEqual);

export { DateOfLossEditContainerMemo as DateOfLossEdit };
