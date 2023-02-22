import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import ReactPaginate from 'react-paginate';
import { Next, Previous } from 'Components/Pagination';
import classes from './pagination.module.css';

interface Props {
  className: string;
  initialPage: number;
  pageCount: number;
  onPageChange: (e: any) => void;
}

const Pagination = ({ className, initialPage, pageCount, onPageChange }: Props) => (
  <ReactPaginate
    containerClassName={`pagination ${className} ${classes.pagination}`}
    pageClassName={classes.pageItem}
    activeClassName={classes.active}
    pageLinkClassName={classes.pageLink}
    previousLabel={<Previous className={classes.previous} />}
    nextLabel={<Next className={classes.next} />}
    pageCount={pageCount}
    onPageChange={onPageChange}
    initialPage={initialPage}
    disableInitialCallback
  />
);

const PaginationMemo = memo(Pagination, areEqual);

export { PaginationMemo as Pagination };
