import { Spinner } from 'Components/Spinner';
import { ProjectsList, ProjectsPagination } from 'Components/Projects';
import { TabContent } from 'Components/Tabs';
import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import classes from './completedProjects.module.css';

interface Props {
  sortBy?: string;
  projects: any;
  fetching: boolean;
  initialPage: number;
  pageCount: number;
  onPageChange: (e: any) => void;
  onClickRow?: (e: any) => void;
  onClickSort?: (e: any) => void;
}

const CompletedProjects = ({
  projects,
  sortBy,
  fetching,
  initialPage,
  pageCount,
  onPageChange,
  onClickRow,
  onClickSort,
}: Props) => (
  <TabContent key="tab-content-completed-projects" id="completed-projects" className="position-relative">
    <div className={classes.projectContent}>
      {fetching && <Spinner loading />}
      {!fetching && (
        <ProjectsList
          iconType="my"
          projects={projects}
          sortBy={sortBy}
          onClickRow={onClickRow}
          onClickSort={onClickSort}
        />
      )}
    </div>
    {projects?.meta?.total >= 15 && (
      <ProjectsPagination initialPage={initialPage} pageCount={pageCount} onPageChange={onPageChange} />
    )}
  </TabContent>
);

CompletedProjects.defaultProps = {
  sortBy: null,
  onClickRow: null,
  onClickSort: null,
};

const CompletedProjectsMemo = memo(CompletedProjects, areEqual);

export { CompletedProjectsMemo as CompletedProjects };
