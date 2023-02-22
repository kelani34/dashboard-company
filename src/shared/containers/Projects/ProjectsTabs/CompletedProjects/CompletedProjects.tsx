import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';

import { CompletedProjects } from 'Components/Projects';
import { CompanyProjectsDataModal } from 'Containers/Projects/Modals/CompanyProjectsModal';
import { firstCompanyIdSelector } from 'Containers/Projects/selectors';
import { listCompanyCompletedProjects } from 'Containers/Projects/actions';
import { useProjectsEvents } from 'Hooks/useProjectsEvents';
import { useProjectsFunctions } from 'Context/Projects';

const completedProjectsSelector = ({ projects }: any) => {
  const value = projects?.completedProjects;
  return value || {};
};

const fetchingCompletedProjectsSelector = ({ projects }: any) => {
  const value = projects?.fetchingCompletedProjects;
  return value || false;
};

interface Props {
  onClickRow?: (e: any) => void;
}

const CompletedProjectsContainer = ({ onClickRow }: Props) => {
  const dispatch = useDispatch();

  const firstCompanyId = useSelector(firstCompanyIdSelector, areEqual);
  const completedProjects: CompanyProjectsDataModal = useSelector(completedProjectsSelector, areEqual);
  const fetching = useSelector(fetchingCompletedProjectsSelector, areEqual);

  const { searchValue }: any = useProjectsFunctions();

  const [sortBy, setSortBy] = useState('-created_at');
  const [pageCount, setPageCount] = useState(1);
  const [initialPage, setInitialPage] = useState(0);

  // project events hook
  const [refreshProjects, setRefreshProjects] = useProjectsEvents();

  const getProjects = useCallback(
    (initialPage = 0) => {
      dispatch(listCompanyCompletedProjects(firstCompanyId, sortBy, initialPage + 1, searchValue));
    },
    [firstCompanyId, sortBy, initialPage, searchValue]
  );

  // sort by: -field === DESC, field === ASC
  // prefix with '-' for DESC
  const onClickSort = useCallback(
    (sort: string) => {
      if (sortBy.includes('-') && sortBy === sort) {
        setSortBy(sort.replace('-', ''));
      } else {
        setSortBy(sort);
      }
    },
    [sortBy]
  );

  // initial API call
  // fetch on sort
  // fetch on page change
  // fetch on search
  // search refetches on all three tabs since limiting it to only one tab turned out to be too complex
  useEffect(() => {
    if (firstCompanyId && (searchValue.length >= 2 || searchValue.length === 0)) {
      setInitialPage(0);
      getProjects();
    }
  }, [firstCompanyId, sortBy, searchValue]);

  // set meta data
  useEffect(() => {
    if (completedProjects?.data?.length > 0) {
      const { meta } = completedProjects;
      const { total } = meta;

      setPageCount(total <= 15 ? 1 : Number(total / 15));
    }
  }, [completedProjects]);

  const onPageChange = useCallback(({ selected: page }: any) => {
    setInitialPage(page);
    getProjects(page);
  }, []);

  // refresh project list on push events
  useEffect(() => {
    if (refreshProjects) {
      getProjects();
      setRefreshProjects(false);
    }
  }, [refreshProjects]);

  return (
    <CompletedProjects
      projects={completedProjects}
      sortBy={sortBy}
      onClickRow={onClickRow}
      onClickSort={onClickSort}
      fetching={fetching}
      initialPage={initialPage}
      pageCount={pageCount}
      onPageChange={onPageChange}
    />
  );
};

CompletedProjectsContainer.defaultProps = {
  onClickRow: null,
};

const CompletedProjectsContainerMemo = memo(CompletedProjectsContainer, areEqual);

export { CompletedProjectsContainerMemo as CompletedProjectsContainer };
