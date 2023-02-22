import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { SideBarFixed } from 'Components/SideBar/SideBarFixed';
import { useSelector } from 'react-redux';
import { photoShareInfoSelector } from 'Containers/Public/PhotoShare/selectors';

const SideBarFixedContainer = () => {
  const { companyName } = useSelector(photoShareInfoSelector);

  return <SideBarFixed companyName={companyName} />;
};

const SideBarFixedContainerMemo = memo(SideBarFixedContainer, areEqual);

export { SideBarFixedContainerMemo as SideBarFixed };
