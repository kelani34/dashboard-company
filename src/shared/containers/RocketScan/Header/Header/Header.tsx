import React, { memo } from 'react';

import { TabContentHeader } from 'Components/TabContentHeader';
import { areEqual } from 'Utils/equalityChecks';
import { ActionsCenter } from 'Containers/RocketScan';

interface Props {
  icon: string;
  name: string;
  propertyType: string;
  locationType?: string;
  projectId?: string;
  jobNumber?: string;
  isCommercial?: boolean;
  isAccessible?: boolean;
}

const HeaderContainer = ({
  icon,
  name,
  propertyType,
  locationType,
  projectId,
  jobNumber,
  isCommercial,
  isAccessible,
}: Props) =>
  name && (
    <TabContentHeader
      icon={icon}
      name={name}
      isCommercial={isCommercial}
      isAccessible={isAccessible}
      projectId={projectId}
      jobNumber={jobNumber}
      actionsCenter={<ActionsCenter locationType={locationType} propertyType={propertyType} />}
      hasDivider
    />
  );

HeaderContainer.defaultProps = {
  locationType: 'roomsview',
  isCommercial: false,
  isAccessible: undefined,
  projectId: undefined,
  jobNumber: undefined,
};
const HeaderContainerMemo = memo(HeaderContainer, areEqual);

export { HeaderContainerMemo as HeaderContainer };
