import React, { memo, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { areEqual } from 'Utils/equalityChecks';

import { DeleteProjectModal } from 'Components/Project';

import { projectSelector } from 'Containers/RocketScan/selectors';
import { deleteProject, setProjectDeleted } from '../actions';
import { projectDeletedSelector } from '../selectors';

interface Props {
  isOpen: boolean;
  setIsOpen: (e: any) => void;
  closeMenu: () => void;
}

const DeleteProjectModalContainer = ({ isOpen, setIsOpen, closeMenu }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const project = useSelector(projectSelector, areEqual);

  const projectDeleted = useSelector(projectDeletedSelector, areEqual);

  const [deleteProjectInfo, setDeleteProjectInfo] = useState({
    projectId: undefined,
    address: undefined,
  });
  const [confirmationString, setConfirmationString] = useState('');

  const onCloseClick = useCallback(() => {
    setIsOpen(false);
    setConfirmationString('');
    closeMenu();
  }, []);

  // get project info on appearance
  useEffect(() => {
    if (isOpen && project?.address) {
      const { id, address } = project;

      const displayAddress = address.address_2 ? `${address.address}, ${address.address_2}` : address.address;

      setDeleteProjectInfo({
        projectId: id,
        address: displayAddress,
      });
    }
  }, [project, isOpen]);

  const onDeleteClick = useCallback(
    (e: any) => {
      e.preventDefault();
      if (deleteProjectInfo) {
        dispatch(deleteProject(deleteProjectInfo.projectId));
      }
    },
    [deleteProjectInfo]
  );

  // close and reset modal when location is deleted
  useEffect(() => {
    if (projectDeleted) {
      setIsOpen(false);
      dispatch(setProjectDeleted(false));
      setConfirmationString('');
      closeMenu();
      history.push('/projects');
    }
  }, [projectDeleted]);

  const onChangeConfirmationString = useCallback((e: any) => {
    const { value } = e.target;

    setConfirmationString(value);
  }, []);

  return (
    <DeleteProjectModal
      isOpen={isOpen}
      confirmationString={confirmationString}
      currentProjectInfo={deleteProjectInfo}
      onChangeConfirmationString={onChangeConfirmationString}
      onCloseClick={onCloseClick}
      onDeleteClick={onDeleteClick}
    />
  );
};

const DeleteProjectModalContainerMemo = memo(DeleteProjectModalContainer, areEqual);

export { DeleteProjectModalContainerMemo as DeleteProjectModal };
