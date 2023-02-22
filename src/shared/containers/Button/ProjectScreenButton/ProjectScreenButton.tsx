import React, { memo, useState, useCallback } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { ProjectScreenButton } from 'Components/Button';

const ProjectScreenButtonContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setModalStatus = useCallback(() => {
    setIsModalOpen((isModalOpen) => !isModalOpen);
  }, []);

  return <ProjectScreenButton onClick={setModalStatus} isModalOpen={isModalOpen} setModalStatus={setModalStatus} />;
};

const ProjectScreenButtonContainerMemo = memo(ProjectScreenButtonContainer, areEqual);
export { ProjectScreenButtonContainerMemo as ProjectScreenButton };
