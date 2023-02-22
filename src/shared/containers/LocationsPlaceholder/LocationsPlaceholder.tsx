import React, { memo } from "react";
import { Icon } from "Components/Icons";
import { PlaceholderLayout } from "Components/Layouts/Placeholder";
import { PurpleButton } from "Components/Button";
import { areEqual } from "Utils/equalityChecks";
import classes from "./locationsPlaceholder.module.css";

interface Props {
  heading?: string;
  svgItem?: number;
  isButtonVisible?: boolean;
  onTabClick?: () => void;
}

const LocationsPlaceholderContainer = ({ heading, svgItem, onTabClick, isButtonVisible = true }: Props) => (
  <div className={`d-flex flex-column justify-content-center align-items-center ${classes.contentWrapper}`}>
    <div className={classes.content}>
      <div className={classes.heading}>{heading}</div>
      <PlaceholderLayout svgItem={svgItem} />

      {isButtonVisible && (
        <PurpleButton id="add-newplocation" type="button" onClick={onTabClick}>
          <>
            <Icon type="cubePlusLg" className={classes.iconButton} />
            <span>Add Location</span>
          </>
        </PurpleButton>
      )}
    </div>
  </div>
);

LocationsPlaceholderContainer.defaultProps = {
  heading: undefined,
  onTabClick: undefined,
  isButtonVisible: undefined,
  svgItem: 1,
};

const LocationsPlaceholderContainerMemo = memo(LocationsPlaceholderContainer, areEqual);

export { LocationsPlaceholderContainerMemo as LocationsPlaceholder };
