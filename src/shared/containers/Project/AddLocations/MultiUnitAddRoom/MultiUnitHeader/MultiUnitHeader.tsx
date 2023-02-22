import React, { memo, useEffect, useState } from "react";
import { Icon } from "Components/Icons";
import { areEqual } from "Utils/equalityChecks";

import { useSelector } from "react-redux";
import { selectedMultiUnitSelector } from "Containers/Project/Unit/selector";
import classes from "./projectHeader.module.css";

const MultiUnitHeaderContainer = () => {
  const selectedMultiUnit: any = useSelector(selectedMultiUnitSelector, areEqual);

  const [iconType] = useState({
    unit: "unit",
    floor: "floor",
  });

  const [locationName, setLocationName] = useState(undefined);
  const [icon, setIcon] = useState(undefined);

  useEffect(() => {
    if (selectedMultiUnit?.name) {
      setLocationName(selectedMultiUnit?.name);
    }
  }, [selectedMultiUnit]);

  useEffect(() => {
    if (selectedMultiUnit?.type === "unit") {
      setIcon(iconType.unit);
    } else if (selectedMultiUnit?.type === "floor") {
      setIcon(iconType.floor);
    }
  }, [selectedMultiUnit]);

  return (
    <div className="container-fluid d-flex flex-row justify-content-start align-items-center p-0">
      <div className="col d-flex flex-row justify-content-start align-items-center">
        <div className={classes.imageWrapper}>
          <Icon type={icon} />
        </div>
        <h1 className={classes.locationName}>{locationName}</h1>
      </div>
    </div>
  );
};
const MultiUnitHeaderContainerMemo = memo(MultiUnitHeaderContainer, areEqual);

export { MultiUnitHeaderContainerMemo as MultiUnitHeader };
