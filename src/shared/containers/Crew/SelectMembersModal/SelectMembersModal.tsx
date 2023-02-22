import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { debounce } from 'Utils/debounce';
import { addOrRemoveFromArray } from 'Utils/helpers';

import {
  attachingEmployeesSelector,
  employeesAttachedSelector,
  employeesSelector,
  fetchingCrewEmployeesSelector,
} from 'Containers/Crew/selectors';
import { listEmployees, setAttachingEmployees, syncEmployeeToProject } from 'Containers/Crew/actions';
import { projectCompanyIdSelector, projectIdSelector } from 'Containers/RocketScan/selectors';

import { useUser } from 'Context/User';

import { Modal } from 'Components/Modal';
import { SearchBox } from 'Components/SearchBox';
import { EmployeeDirectory, EmployeesEmptyPlaceholder } from 'Components/Crew';
import { Spinner } from 'Components/Spinner';

import classes from './selectMembersModal.module.css';

interface Props {
  isOpen: boolean;
  onClickModalCloseClick: (e: any) => void;
}

const SelectMembersModalContainer = ({ isOpen, onClickModalCloseClick }: Props) => {
  const dispatch = useDispatch();

  const textBoxRef = useRef(undefined);

  // user object
  const { id: userId } = useUser();

  // local variables
  const [searchValue, setSearchValue] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showNoEmployees, setShowNoEmployees] = useState(true);
  const [showError, setShowError] = useState(false);
  const [initialMount, setInitialMount] = useState(false);

  // selectors
  const employees = useSelector(employeesSelector, areEqual);
  const companyId = useSelector(projectCompanyIdSelector, areEqual);
  const projectId = useSelector(projectIdSelector, areEqual);
  const fetching = useSelector(fetchingCrewEmployeesSelector, areEqual);
  const disableButton = useSelector(attachingEmployeesSelector, areEqual);
  const employeesAttached = useSelector(employeesAttachedSelector, areEqual);

  useEffect(() => {
    setInitialMount(true);
  }, []);

  // api call
  const getEmployees = useCallback(
    (search = '') => {
      dispatch(listEmployees(companyId, userId, search));
    },
    [companyId, userId]
  );

  // initial api call
  useEffect(() => {
    if (isOpen && companyId && employees.length === 0) {
      getEmployees();
    }
  }, [isOpen, companyId]);

  // handle search box value change
  const handleSearchValueChange = ({ target: { value } }: any) => {
    if (value.length <= 36) {
      setInitialMount(false);
      setSearchValue(value);
      if (value.length >= 2) {
        getEmployees(value);
      }
      if (value.length === 0) {
        getEmployees();
      }
    }
  };

  // show no employees only once on initial mount
  useEffect(() => {
    if (initialMount) {
      setShowNoEmployees(employees.length === 0);
    }
  }, [initialMount, employees]);

  // debounce function on search value change
  const onChangeSearchValue = useMemo(() => debounce(handleSearchValueChange, 300), [companyId]);

  const onClickClearButton = useCallback(() => {
    getEmployees();
    setSearchValue('');
    textBoxRef.current.value = '';
    textBoxRef.current.focus();
    setShowError(false);
  }, [companyId, userId, textBoxRef]);

  // generate members id array
  const onClickMemberRow = useCallback(({ currentTarget: { id } }: any) => {
    setSelectedMembers((prevIds) => addOrRemoveFromArray(prevIds, id));
  }, []);

  // form submit api call
  const onClickSelectCrew = useCallback(() => {
    setShowError(selectedMembers.length === 0);
    if (selectedMembers.length > 0) {
      dispatch(setAttachingEmployees(true));

      // no bulk users submit so we use a loop to submit multiple members
      selectedMembers.forEach((selectedMember: string, index: number) =>
        dispatch(syncEmployeeToProject(projectId, selectedMember, selectedMembers.length - 1 === index))
      );
    }
  }, [selectedMembers, projectId]);

  // refresh employees
  useEffect(() => {
    if (employeesAttached) {
      setSelectedMembers([]);
      getEmployees();
    }
  }, [employeesAttached]);

  return (
    <Modal
      isOpen={isOpen}
      title="Select Crew"
      id="select-crew"
      modalCloseClick={onClickModalCloseClick}
      modalHeader
      classes={classes}
    >
      {!showNoEmployees && (
        <SearchBox
          ref={textBoxRef}
          id="crew-search"
          name="search"
          ariaLabel="Search a crew member"
          value={searchValue}
          onChangeValue={onChangeSearchValue}
          onClickClearButton={onClickClearButton}
        />
      )}

      {!showNoEmployees && (
        <EmployeeDirectory
          employees={employees}
          selectedMembers={selectedMembers}
          showError={showError}
          searchValue={searchValue}
          disableButton={disableButton}
          onClickMemberRow={onClickMemberRow}
          onClickSelectCrew={onClickSelectCrew}
        />
      )}

      {!fetching && showNoEmployees && <EmployeesEmptyPlaceholder />}

      <Spinner loading={fetching} />
    </Modal>
  );
};

const SelectMembersModalContainerMemo = memo(SelectMembersModalContainer, areEqual);

export { SelectMembersModalContainerMemo as SelectMembersModalContainer };
