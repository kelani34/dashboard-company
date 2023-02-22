import React, { memo } from 'react';

import { ProjectRow } from 'Components/Dashboard/ProjectRow';
import { areEqual } from 'Utils/equalityChecks';

interface Props {
  title: any;
  uid: any;
  alias: any;
  project: any;
  numOfUnits: number;
  numOfPhotos: number;
  numOfFloors: number;
  selected: boolean;
  handleChangeProject: any;
}

const ProjectRowContainer = ({
  title,
  uid,
  alias,
  project,
  numOfPhotos,
  numOfUnits,
  selected,
  handleChangeProject,
  numOfFloors,
}: Props) => {
  const onClick = () => {
    if (handleChangeProject) {
      handleChangeProject(project);
    }
  };
  return (
    <ProjectRow
      onClick={onClick}
      selected={selected}
      title={title}
      alias={alias}
      numOfPhotos={numOfPhotos}
      numOfUnits={numOfUnits}
      numOfFloors={numOfFloors}
      uid={uid}
    />
  );
};

const ProjectRowMemo = memo(ProjectRowContainer, areEqual);

export { ProjectRowMemo as ProjectRow };
