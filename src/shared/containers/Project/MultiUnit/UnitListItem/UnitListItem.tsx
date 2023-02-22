import React, { memo, useCallback } from "react";

import { Anchor } from "Components/Anchor";
import { areEqual } from "Utils/equalityChecks";
import { Icon } from "Components/Icons";

import classes from "./unitListItem.module.css";

interface Props {
  unit: any;
  onSelectItem?: (e: any) => void;
}

const UnitListItemContainer = ({ unit, onSelectItem }: Props) => {
  const onClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    if (onSelectItem) onSelectItem(unit);
  }, []);

  return (
    <Anchor
      id={unit.id.toLocaleString()}
      href="#"
      className={`list-group-item list-group-item-action ${classes.listItemText}`}
      ariaLabel="name"
      dataId={unit.id}
      dataName={unit.name}
      onClick={onClick}
    >
      <Icon type="unit" className={classes.icon} />
      {unit.name}
      <Icon type="sidebarrightarrow" />
    </Anchor>
  );
};

UnitListItemContainer.defaultProps = {
  onSelectItem: undefined,
};

const UnitListItemContainerMemo = memo(UnitListItemContainer, areEqual);

export { UnitListItemContainerMemo as UnitListItem };
