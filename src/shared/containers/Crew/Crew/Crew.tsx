import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useUser } from 'Context/User';
import { UserModel } from 'Containers/User/Models/UserModel';

import { useDispatch, useSelector } from 'react-redux';
import {
  employeeRemovedSelector,
  employeesAttachedSelector,
  fetchingMembersSelector,
  membersSelector,
} from 'Containers/Crew/selectors';
import { listProjectMembers, setEmployeesAttached } from 'Containers/Crew/actions';
import { projectIdSelector } from 'Containers/RocketScan/selectors';

import { Spinner } from 'Components/Spinner';
import { GeneralToast } from 'Components/Toast';
import { AvatarOrInitials } from 'Components/Avatar';
import { CrewPlaceholder } from 'Components/Crew/CrewPlaceholder';
import { SelectMembersModal, Members } from 'Containers/Crew';
import { CrewWrapper, Crew } from 'Components/Crew';

import { convertWordsFirstLetterUppercase } from 'Utils/helpers';
import classes from './crew.module.css';

const CrewContainer = () => {
  const {
    avatar_url: avatar = '',
    first_name: firstName,
    last_name: lastName,
    full_name: fullName,
  }: UserModel = useUser();

  const dispatch = useDispatch();

  // user object
  const { id: userId } = useUser();

  // local variables
  const [isOpenSelectMembersModal, setIsOpenSelectMembersModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // selectors
  const employeesAttached = useSelector(employeesAttachedSelector, areEqual);
  const employeeRemoved = useSelector(employeeRemovedSelector, areEqual);
  const members = useSelector(membersSelector, areEqual);
  const projectId = useSelector(projectIdSelector, areEqual);
  const fetching = useSelector(fetchingMembersSelector, areEqual);

  // api
  const getProjectMembers = useCallback(() => {
    dispatch(listProjectMembers(projectId, userId));
  }, [projectId]);

  // initial api call
  useEffect(() => {
    if (projectId) {
      getProjectMembers();
    }
  }, [projectId]);

  const onClickAddCrew = useCallback(() => {
    setIsOpenSelectMembersModal(true);
  }, []);

  const onClickMemberModalCloseClick = useCallback((e: any) => {
    e.preventDefault();
    setIsOpenSelectMembersModal(false);
  }, []);

  const onClickToastClose = useCallback(() => setShowToast(false), []);

  useEffect(() => {
    if (employeesAttached) {
      setIsOpenSelectMembersModal(false);
      setToastMessage('Crew member(s) added');
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    }
  }, [employeesAttached]);

  useEffect(() => {
    if (!isOpenSelectMembersModal && employeesAttached) {
      getProjectMembers();
    }

    return () => {
      if (!isOpenSelectMembersModal && employeesAttached) {
        dispatch(setEmployeesAttached(false));
      }
    };
  }, [isOpenSelectMembersModal, employeesAttached]);

  useEffect(() => {
    if (typeof employeeRemoved === 'string') {
      dispatch(listProjectMembers(projectId, userId));

      setToastMessage(`${convertWordsFirstLetterUppercase(employeeRemoved)} Removed From Project`);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    }
  }, [employeeRemoved]);

  return (
    <CrewWrapper>
      <Crew
        onClickAddCrew={onClickAddCrew}
        hasCrew={members.length > 0}
        currentUserAvatar={<AvatarOrInitials avatar={avatar || ''} firstName={firstName} lastName={lastName} />}
        currentUserName={fullName}
      >
        <Spinner loading={fetching} />

        {members.length === 0 && !fetching && <CrewPlaceholder onClickAddCrew={onClickAddCrew} />}

        {!fetching && (
          <SelectMembersModal isOpen={isOpenSelectMembersModal} onClickModalCloseClick={onClickMemberModalCloseClick} />
        )}

        {members.length > 0 && <Members members={members} />}

        <GeneralToast
          id="crew-toast"
          className={classes.toast}
          show={showToast}
          message={toastMessage}
          closeToast={onClickToastClose}
        />
      </Crew>
    </CrewWrapper>
  );
};

const CrewContainerMemo = memo(CrewContainer, areEqual);

export { CrewContainerMemo as Crew };
