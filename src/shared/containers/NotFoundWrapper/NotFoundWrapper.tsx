import React, { memo } from 'react';

import { useHistory } from 'react-router-dom';

import { areEqual } from 'Utils/equalityChecks';

import { NotFoundLayout } from 'Components/Layouts';

const NotFoundWrapperContainer = () => {

  const history = useHistory();

  const homepage = () => {
    history.push('/dashboard');
  };

  return <NotFoundLayout onFormButtonClick={homepage} />;

};

const NotFoundWrapperContainerMemo = memo(NotFoundWrapperContainer, areEqual);

export { NotFoundWrapperContainerMemo as NotFoundWrapperContainer };
