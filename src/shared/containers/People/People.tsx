import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { PeopleTabs } from './PeopleTabs';

const PeopleContainer = () => <PeopleTabs />;

const PeopleContainerMemo = memo(PeopleContainer, areEqual);

export { PeopleContainerMemo as PeopleContainer };
