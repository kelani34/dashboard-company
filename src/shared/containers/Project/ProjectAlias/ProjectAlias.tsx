import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { projectAliasSelector } from 'Containers/RocketScan/selectors';

import { ProjectAliasModal } from 'Components/Project';

import { updateProjectAlias } from 'Containers/Project/actions';

import { convertWordsFirstLetterUppercase } from 'Utils/helpers';

import classes from './projectAlias.module.css';

interface Props {
  projectId: any;
}

const ProjectAliasContainer = ({ projectId }: Props) => {
  const dispatch = useDispatch();

  const alias = useSelector(projectAliasSelector, areEqual);

  const [isOpen, setIsOpen] = useState(false);
  const [newAlias, setNewAlias] = useState(alias);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onChangeAlias = useCallback((e: any) => {
    const { value } = e.target;

    setNewAlias(value);
  }, []);

  const onSaveClick = useCallback(() => {
    if (projectId) {
      dispatch(updateProjectAlias(projectId, convertWordsFirstLetterUppercase(newAlias)));
      setIsOpen(false);
    }
  }, [projectId, newAlias]);

  // change field content when switching projects
  useEffect(() => {
    setNewAlias(alias);
  }, [alias]);

  return (
    <>
      <div
        className={classes.alias}
        onClick={openModal}
        onKeyPress={openModal}
        tabIndex={0}
        title="Add or edit project alias"
        role="button"
      >
        {alias ?? 'Add Alias'}
      </div>
      <ProjectAliasModal
        isOpen={isOpen}
        onCloseClick={onCloseClick}
        alias={newAlias ?? ''}
        onChangeAlias={onChangeAlias}
        onSaveClick={onSaveClick}
      />
    </>
  );
};

const ProjectAliasContainerMemo = memo(ProjectAliasContainer, areEqual);

export { ProjectAliasContainerMemo as ProjectAlias };
