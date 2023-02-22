import { Pagination } from 'Components/Pagination';
import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import classes from './projectsPagination.module.css';

interface Props {
  initialPage: number;
  pageCount: number;
  onPageChange: (e: any) => void;
}

const ProjectsPagination = ({ initialPage, pageCount, onPageChange }: Props) => (
  <div className={classes.projectsPaginationBase}>
    <Pagination className="project" initialPage={initialPage} pageCount={pageCount} onPageChange={onPageChange} />
  </div>
);

const ProjectsPaginationMemo = memo(ProjectsPagination, areEqual);

export { ProjectsPaginationMemo as ProjectsPagination };
