import React, { memo, useCallback } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { SelectAccountType } from 'Components/SignIn/SelectAccountType';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { inviteCompanyInfoSelector } from 'Containers/SignIn/SignInHow/selector';

const SelectAccountTypeContainer = () => {
  const history = useHistory();

  const { name: companyName } = useSelector(inviteCompanyInfoSelector, areEqual);

  const onClickCreate = useCallback(() => {
    history.push('/signupemail');
  }, []);

  const onClickJoin = useCallback(() => {
    if (!companyName) {
      history.push('/nocompany');
    } else {
      history.push('/signupemail');
    }
  }, []);

  return <SelectAccountType onClickCreate={onClickCreate} onClickJoin={onClickJoin} />;
};

const SelectAccountTypeContainerMemo = memo(SelectAccountTypeContainer, areEqual);

export { SelectAccountTypeContainerMemo as SelectAccountType };
