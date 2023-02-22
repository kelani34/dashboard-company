import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { ProjectsContext } from 'Context/Projects';
import { ProjectsSearchFunctions } from 'Context/Projects/ProjectsContext';

// projects form provider
const ProjectsProvider = ({ children }: any) => {
  const ProjectsSearch = ProjectsSearchFunctions();

  return <ProjectsContext.Provider value={{ ...ProjectsSearch }}>{children}</ProjectsContext.Provider>;
};

const ProjectsProviderMemo = memo(ProjectsProvider, areEqual);

export { ProjectsProviderMemo as ProjectsProvider };
