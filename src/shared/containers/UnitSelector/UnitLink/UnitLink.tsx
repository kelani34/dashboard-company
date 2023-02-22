import React, { memo, useCallback } from "react";

import { UnitLink } from "Components/Selectors/UnitLink";
import { areEqual } from "Utils/equalityChecks";

interface Props {
  id: number;
  name: string;
  onClickUnit: (e: any) => void;
}

const UnitLinkContainer = ({ id, name, onClickUnit }: Props) => {
  const onUnitClick = useCallback(() => {
    if (onClickUnit) onClickUnit({ id, name });
  }, []);

  return <UnitLink name={name} onClickUnit={onUnitClick} />;
};

const UnitLinkContainerMemo = memo(UnitLinkContainer, areEqual);
export { UnitLinkContainerMemo as UnitLink };
