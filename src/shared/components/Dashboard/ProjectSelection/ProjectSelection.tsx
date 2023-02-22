import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { CompanyProjectsDataModal } from 'Containers/Projects/Modals';

// import { Spinner } from 'Components/Spinner';
import { ProjectRow } from 'Containers/ProjectRow';
import { Spinner } from 'Components/Spinner';
import classes from './projectSelection.module.css';

interface Props {
  myProjects: CompanyProjectsDataModal;
  fetching: any;
  handleChangeProject: any;
  activeProject: any;
  setTabWIP?: any;
  setTabProjects: any;
  activeTab: number;
  handleViewAll: any;
}

const ProjectSelection = ({
  myProjects,
  fetching,
  handleChangeProject,
  activeProject,
  // setTabWIP,
  setTabProjects,
  activeTab,
  handleViewAll,
}: Props) => (
  <div className={`card ${classes.cardBase}`}>
    <div onKeyUp={handleViewAll} onClick={handleViewAll} role="button" tabIndex={0} className={`${classes.viewAll}`}>
      View All
    </div>
    <div className={classes.tabsRow}>
      <div
        onKeyUp={setTabProjects}
        role="button"
        tabIndex={0}
        onClick={setTabProjects}
        className={`${classes.tabContainer} ${activeTab === 0 ? classes.selectedTabContainer : ''} `}
      >
        My Projects
      </div>
    </div>
    {fetching && (
      <div className={classes.relativePos}>
        <Spinner loading />
      </div>
    )}
    <div className={classes.projectsContainer}>
      {/* TODO:: TO AJ - don't use nested ternary expressions (eslint doesn't like them) */}
      {!fetching &&
        myProjects?.data?.length > 0 &&
        myProjects.data.map((project) => (
          <ProjectRow
            handleChangeProject={handleChangeProject}
            selected={activeProject?.id === project.id}
            key={project.uid}
            project={project}
            title={project.address.address}
            numOfPhotos={project.photos_count}
            numOfUnits={project.units_count}
            numOfFloors={project.floors_count}
            uid={project.uid}
            alias={project.alias}
          />
        ))}
    </div>
  </div>
);

const ProjectSelectionMemo = memo(ProjectSelection, areEqual);

export { ProjectSelectionMemo as ProjectSelection };
