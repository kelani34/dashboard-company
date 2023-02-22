import React, { memo, useCallback, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { RocketDryRooms } from 'Containers/RocketDry';
import { RocketDryLocationAccordion } from 'Components/RocketDry';

interface Props {
  location: any;
}

const RocketDryLocationContainer = ({ location }: Props) => {
  const { id, name } = location;

  const [isOpen, setIsOpen] = useState(true);

  // accordion methods
  const onToggleClick = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return (
    <RocketDryLocationAccordion
      id={id}
      icon="singlehomesm"
      type="location"
      title={name}
      isOpen={isOpen}
      onToggleClick={onToggleClick}
    >
      <RocketDryRooms locationId={id} isLocationOpen={isOpen} />
    </RocketDryLocationAccordion>
  );
};

const RocketDryLocationContainerMemo = memo(RocketDryLocationContainer, areEqual);

export { RocketDryLocationContainerMemo as RocketDryLocation };
