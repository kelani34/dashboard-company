import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { NoProjectsTable } from 'Components/Projects/ProjectsTabs/NoProjectsTable';

import { useProjectsFunctions } from 'Context/Projects';

interface Props {
  iconType: string;
}

const NoProjectsTableContainer = ({ iconType }: Props) => {
  const { searchValue }: any = useProjectsFunctions();

  return <NoProjectsTable iconType={iconType} searchValue={searchValue} />;
};

const NoProjectsTableContainerMemo = memo(NoProjectsTableContainer, areEqual);

export { NoProjectsTableContainerMemo as NoProjectsTable };
