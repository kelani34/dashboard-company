import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { ContractFormTabs } from 'Containers/ContractForm/ContractTabs';

const ContractFormContainer = () => <ContractFormTabs />;

const ContractFormContainerMemo = memo(ContractFormContainer, areEqual);

export { ContractFormContainerMemo as ContractFormContainer };
