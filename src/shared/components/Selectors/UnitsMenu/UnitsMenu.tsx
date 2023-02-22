import React, { memo } from 'react';

import { LocationMenuItem } from 'Containers/Public/PhotoShare/PhotoShareWrapper';
import { areEqual } from 'Utils/equalityChecks';

type UnitType = {
  id: number;
  name: string;
};

interface Props {
  unitTypes: Array<UnitType>;
  accordionId: string;
  itemMenuHeading: string;
  itemSubOptions: string;
}

const UnitsMenu = ({ unitTypes, accordionId, itemMenuHeading, itemSubOptions }: Props) => (
  <div className="accordion" id={accordionId}>
    {unitTypes.length > 0 &&
      unitTypes.map((unit) => (
        <LocationMenuItem
          key={unit.id}
          item={unit}
          accordionId={accordionId}
          itemMenuHeading={itemMenuHeading}
          itemSubOptions={itemSubOptions}
        />
      ))}
  </div>
);

const UnitsMenuMemo = memo(UnitsMenu, areEqual);

export { UnitsMenuMemo as UnitsMenu };
