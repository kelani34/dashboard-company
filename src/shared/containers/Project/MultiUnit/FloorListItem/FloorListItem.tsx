import React, { memo, useCallback } from "react";

import { Anchor } from "Components/Anchor";
import { areEqual } from "Utils/equalityChecks";
import { Icon } from "Components/Icons";

import classes from "./floorListItem.module.css";

interface Props {
  floor: any;
  onSelectItem?: (e: any) => void;
}

const FloorListItemContainer = ({ floor, onSelectItem }: Props) => {
  const onClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    if (onSelectItem) onSelectItem(floor);
  }, []);

  return (
    <Anchor
      id={floor.id.toLocaleString()}
      href="#"
      className={`list-group-item list-group-item-action ${classes.listItemText}`}
      ariaLabel="name"
      dataId={floor.id}
      dataName={floor.name}
      onClick={onClick}
    >
      <Icon type="floor" className={classes.icon} />
      {floor.name}
      <Icon type="sidebarrightarrow" />
    </Anchor>
  );
};

FloorListItemContainer.defaultProps = {
  onSelectItem: undefined,
};

const FloorListItemContainerMemo = memo(FloorListItemContainer, areEqual);

export { FloorListItemContainerMemo as FloorListItem };
