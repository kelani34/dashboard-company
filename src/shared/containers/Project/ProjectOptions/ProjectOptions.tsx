import React, { memo, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';
import { Button } from 'Components/Button';

import { EditAddressModal, DeleteProjectModal } from 'Containers/Project';

import { projectIdSelector, projectSelector } from 'Containers/RocketScan/selectors';

import { updateProjectStatus } from '../actions';

import classes from './projectOptions.module.css';

const ProjectOptions = () => {
  const dispatch = useDispatch();

  const projectId = useSelector(projectIdSelector);
  const project = useSelector(projectSelector, areEqual);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
  const [isDeleteProjectOpen, setIsDeleteProjectOpen] = useState(false);

  const onOptionButtonClick = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const markProjectAsWip = useCallback(() => {
    dispatch(updateProjectStatus(projectId, '1')); // status ID 1 is WIP
    setIsMenuOpen(false);
  }, [projectId]);

  const markProjectAsComplete = useCallback(() => {
    dispatch(updateProjectStatus(projectId, '2')); // status ID 2 is completed
    setIsMenuOpen(false);
  }, [projectId]);

  const openEditAddress = useCallback(() => {
    setIsEditAddressOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const openDeleteProject = useCallback(() => {
    setIsDeleteProjectOpen(true);
  }, []);

  return (
    <>
      <Button onClick={onOptionButtonClick} className={classes.projectOptionsButton}>
        <Icon className={classes.icon} type="threedots" />
      </Button>
      {isMenuOpen && (
        <div className={`accordion-body ${classes.projectOptionsWrapper}`}>
          {project.projectStatus?.id === 1 && (
            <Button className={classes.projectOption} id="mark-project-complete" onClick={markProjectAsComplete}>
              Mark Project as Complete
            </Button>
          )}
          {project.projectStatus?.id === 2 && (
            <Button className={classes.projectOption} id="mark-project-wip" onClick={markProjectAsWip}>
              Mark Project as WIP
            </Button>
          )}
          <Button className={classes.projectOption} id="2" onClick={openEditAddress}>
            Edit Project Address
          </Button>
          <Button className={classes.projectOption} id="3" onClick={openDeleteProject}>
            Delete Project
          </Button>
        </div>
      )}
      <EditAddressModal isOpen={isEditAddressOpen} setIsOpen={setIsEditAddressOpen} onAddressUpdated={closeMenu} />
      <DeleteProjectModal isOpen={isDeleteProjectOpen} setIsOpen={setIsDeleteProjectOpen} closeMenu={closeMenu} />
    </>
  );
};

const ProjectOptionsMemo = memo(ProjectOptions, areEqual);

export { ProjectOptionsMemo as ProjectOptions };
