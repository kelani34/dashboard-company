import { Spinner } from 'Components/Spinner';
import { ProjectsList, ProjectsPagination } from 'Components/Projects';
import { TabContent } from 'Components/Tabs';
import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import classes from './myProjects.module.css';

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

const MyProjects = ({
  sortBy,
  projects,
  initialPage,
  pageCount,
  onPageChange,
  onClickRow,
  onClickSort,
  fetching,
}: Props) => (
  <TabContent key="tab-content-wip-projects" id="my-projects" className="show active position-relative">
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

MyProjects.defaultProps = {
  sortBy: null,
  onClickRow: null,
  onClickSort: null,
};

const MyProjectsMemo = memo(MyProjects, areEqual);

export { MyProjectsMemo as MyProjects };
