import React, { memo, useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { areEqual } from 'Utils/equalityChecks';

import { EditAddress } from 'Containers/Projects/EditAddress';
import { CreateProject } from 'Containers/Projects/CreateProject';
import { CreateProjectMain } from 'Components/Projects';
import { useDispatch, useSelector } from 'react-redux';
import { setProjectCreated } from 'Containers/Projects/actions';
import { resetAddressRequest } from 'Containers/Address/actions';
import { projectCreatedSelector } from '../selectors';

const CreateProjectMainContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [path, setPath] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalClosed, setModalClosed] = useState(false);

  const projectCreated = useSelector(projectCreatedSelector, areEqual);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const { pathname } = location;
    setPath(pathname);
  }, [location.pathname]);

  const modalCloseClick = useCallback(() => {
    setIsOpen(false);
    history.push('/projects');
  }, []);

  // trigger the roure change once the project created
  useEffect(() => {
    if (projectCreated) {
      // set the modal close on project created
      setIsOpen(false);
      // set the modal closed local variable
      setModalClosed(true);
    }
  }, [projectCreated, location.pathname]);
  // modal close is taking little time and leave a background overlay on route change
  // so, we'll do a simple check to see if the modal close has been actually closed and do the route change
  useEffect(() => {
    if (modalClosed) {
      history.push(`/projects/${projectCreated}/rocketscan`);
    }

    return () => {
      // clear local modal close state
      setModalClosed(false);
      // clear address object
      dispatch(resetAddressRequest());
      // clear redux project created
      dispatch(setProjectCreated(undefined));
    };
  }, [modalClosed]);

  return (
    <CreateProjectMain isOpen={isOpen} modalCloseClick={modalCloseClick}>
      {path === '/projects/editAddress' ? <EditAddress /> : <CreateProject />}
    </CreateProjectMain>
  );
};

const CreateProjectMainContainerMemo = memo(CreateProjectMainContainer, areEqual);

export { CreateProjectMainContainerMemo as CreateProjectMainContainer };
