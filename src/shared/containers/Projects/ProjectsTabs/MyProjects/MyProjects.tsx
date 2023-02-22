import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';

import { MyProjects } from 'Components/Projects';
import { CompanyProjectsDataModal } from 'Containers/Projects/Modals/CompanyProjectsModal';
import { listCompanyMyProjects } from 'Containers/Projects/actions';
import { firstCompanyIdSelector, myProjectsSelector, fetchingMyProjectsSelector } from 'Containers/Projects/selectors';
import { UserModel } from 'Containers/User/Models/UserModel';
import { useUser } from 'Context/User';
import { useProjectsEvents } from 'Hooks/useProjectsEvents';
import { useProjectsFunctions } from 'Context/Projects';

interface Props {
  onClickRow?: (e: any) => void;
}

const MyProjectsContainer = ({ onClickRow }: Props) => {
  const dispatch = useDispatch();

  const userData: UserModel = useUser();
  const myProjects: CompanyProjectsDataModal = useSelector(myProjectsSelector, areEqual);
  const firstCompanyId = useSelector(firstCompanyIdSelector, areEqual);
  const fetching = useSelector(fetchingMyProjectsSelector, areEqual);

  const { searchValue }: any = useProjectsFunctions();

  const [sortBy, setSortBy] = useState('-created_at');
  const [pageCount, setPageCount] = useState(1);
  const [initialPage, setInitialPage] = useState(0);

  // project events hook
  const [refreshProjects, setRefreshProjects] = useProjectsEvents();

  const getProjects = useCallback(
    (initialPage = 0) => {
      const { id: userId } = userData;
      dispatch(listCompanyMyProjects(firstCompanyId, userId, sortBy, initialPage + 1, searchValue));
    },
    [firstCompanyId, userData, sortBy, initialPage, searchValue]
  );

  // initial API call
  // fetch on sort
  // fetch on page change
  // fetch on search
  // search refetches on all three tabs since limiting it to only one tab turned out to be too complex
  useEffect(() => {
    if (firstCompanyId && userData?.id && (searchValue.length >= 2 || searchValue.length === 0)) {
      setInitialPage(0);
      getProjects();
    }
  }, [firstCompanyId, userData, sortBy, searchValue]);

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

  // set meta data
  useEffect(() => {
    if (myProjects?.data?.length > 0) {
      const { meta } = myProjects;
      const { total } = meta;

      setPageCount(total <= 15 ? 1 : Number(total / 15));
    }
  }, [myProjects]);

  const onPageChange = useCallback(
    ({ selected: page }: any) => {
      setInitialPage(page);
      getProjects(page);
    },
    [userData]
  );

  // refresh project list on push events
  useEffect(() => {
    if (refreshProjects) {
      getProjects();
      setRefreshProjects(false);
    }
  }, [refreshProjects]);

  return (
    <MyProjects
      projects={myProjects}
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

MyProjectsContainer.defaultProps = {
  onClickRow: null,
};

const MyProjectsContainerMemo = memo(MyProjectsContainer, areEqual);

export { MyProjectsContainerMemo as MyProjectsContainer };
