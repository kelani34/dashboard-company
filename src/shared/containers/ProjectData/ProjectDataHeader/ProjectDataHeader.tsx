import React, { memo, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { TabContentHeader } from 'Components/TabContentHeader';
import { useSelector } from 'react-redux';
import { projectAddressSelector, projectSelector, propertySelector } from 'Containers/RocketScan/selectors';

const ProjectDataHeaderContainer = () => {
  const [headerIcon, setHeaderIcon] = useState('singlehome');

  const project = useSelector(projectSelector, areEqual);
  const projectAddress = useSelector(projectAddressSelector, areEqual);
  const property = useSelector(propertySelector, areEqual);

  useEffect(() => {
    if (property?.id) {
      setHeaderIcon(property.name === 'singleunit' ? 'singlehome' : 'highrise');
    }
  }, [property]);

  return (
    projectAddress && (
      <TabContentHeader
        icon={headerIcon}
        name={projectAddress}
        isCommercial={false}
        isAccessible={false}
        projectId={project.id}
        jobNumber={project.uid}
        hasDivider
      />
    )
  );
};

const ProjectDataHeaderContainerMemo = memo(ProjectDataHeaderContainer, areEqual);

export { ProjectDataHeaderContainerMemo as ProjectDataHeader };
