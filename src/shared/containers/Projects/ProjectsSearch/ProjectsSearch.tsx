import React, { memo } from 'react';
import { useProjectsFunctions } from 'Context/Projects';
import { areEqual } from 'Utils/equalityChecks';

import { SearchBox } from 'Components/SearchBox';

import classes from './projectsSearch.module.css';

const ProjectsSearchContainer = () => {
  const { searchBoxRef, searchValue, onChangeSearchValue, onClickClearButton }: any = useProjectsFunctions();

  return (
    <div className={classes.notesSearchBase}>
      <SearchBox
        id="projects-search-box"
        ref={searchBoxRef}
        value={searchValue}
        placeholder="Search projects"
        name="search"
        ariaLabel="Search projects"
        onChangeValue={onChangeSearchValue}
        onClickClearButton={onClickClearButton}
      />
    </div>
  );
};

const ProjectsSearchContainerMemo = memo(ProjectsSearchContainer, areEqual);

export { ProjectsSearchContainerMemo as ProjectsSearchContainer };
