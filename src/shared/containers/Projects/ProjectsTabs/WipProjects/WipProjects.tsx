import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';

import { CompanyProjectsDataModal } from 'Containers/Projects/Modals/CompanyProjectsModal';
import { WipProjects } from 'Components/Projects';
import { listCompanyWipProjects } from 'Containers/Projects/actions';
import { firstCompanyIdSelector } from 'Containers/Projects/selectors';
import { useProjectsEvents } from 'Hooks/useProjectsEvents';
import { useProjectsFunctions } from 'Context/Projects';

const wipProjectsSelector = ({ projects }: any) => {
  const value = projects?.wipProjects;
  return value || {};
};

const fetchingWipProjectsSelector = ({ projects }: any) => {
  const value = projects?.fetchingWipProjects;
  return value || false;
};

interface Props {
  onClickRow?: (e: any) => void;
}

const WipProjectsContainer = ({ onClickRow }: Props) => {
  const dispatch = useDispatch();

  const firstCompanyId = useSelector(firstCompanyIdSelector, areEqual);
  const wipProjects: CompanyProjectsDataModal = useSelector(wipProjectsSelector, areEqual);
  const fetching = useSelector(fetchingWipProjectsSelector, areEqual);

  const { searchValue }: any = useProjectsFunctions();

  const [sortBy, setSortBy] = useState('-created_at');
  const [pageCount, setPageCount] = useState(1);
  const [initialPage, setInitialPage] = useState(0);

  // project events hook
  const [refreshProjects, setRefreshProjects] = useProjectsEvents();

  const getProjects = useCallback(
    (initialPage = 0) => {
      dispatch(listCompanyWipProjects(firstCompanyId, sortBy, initialPage + 1, searchValue));
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
    if (wipProjects?.data?.length > 0) {
      const { meta } = wipProjects;
      const { total } = meta;

      setPageCount(total <= 15 ? 1 : Number(total / 15));
    }
  }, [wipProjects]);

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
    <WipProjects
      projects={wipProjects}
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

WipProjectsContainer.defaultProps = {
  onClickRow: null,
};

const WipProjectsContainerMemo = memo(WipProjectsContainer, areEqual);

export { WipProjectsContainerMemo as WipProjectsContainer };
