import { Icon } from "Components/Icons";
import React, { memo, ReactNode } from "react";

// import { UnitSelector } from "Containers/UnitSelector";
import { UnitSelector } from "Containers/UnitSelector";
import { areEqual } from "Utils/equalityChecks";
import { width } from "Utils/screen";
import { Tab } from "../Tab";
import classes from "./locations.tabs.module.css";

interface Props {
  id?: string;
  selectedSubPath?: string;
  className?: string;
  children?: ReactNode;
  selectedPropertyId: string | number;
  onSubTabsClick?: (e: any) => void;
}

/*
  Custom Tab for Locations
*/

const createTabs = (activeTab: string, selectedPropertyId: string | number, onTabClick: any) => (
  <>
    <Tab
      key="all-locations-tab"
      id="all-locations-tab"
      className={`${classes.flexCenter} ${activeTab === "all-locations-tab" ? `active ${classes["active-Tab"]}` : ""}`}
      target="all-locations"
      tabIndex={0}
      onClick={onTabClick}
    >
      <>
        <Icon
          type="cube"
          className={activeTab === "all-locations-tab" ? `${classes["icon-active"]}` : classes["icon-inactive"]}
        />
        <span>All Locations</span>
      </>
      {selectedPropertyId && (
        <div className={classes.dropdownMenu}>
          <UnitSelector accordionId="unitMenu-all" unitMenuHeading="unitNumbers-all" roomOptions="roomId-all" />
        </div>
      )}
    </Tab>

    <Tab
      key="add-locations-tab"
      id="add-locations-tab"
      className={`${classes.flexCenter} ${activeTab === "add-locations-tab" ? `active ${classes["active-Tab"]}` : ""}`}
      target="add-locations"
      tabIndex={0}
      onClick={onTabClick}
    >
      <>
        <Icon
          type="cubePlus"
          className={activeTab !== "all-locations-tab" ? `${classes["icon-active"]}` : classes["icon-inactive"]}
        />

        <span>Add Locations</span>
      </>
      {selectedPropertyId && (
        <div className={classes.dropdownMenu}>
          <UnitSelector accordionId="unitMenu-add" unitMenuHeading="unitNumbers-add" roomOptions="roomId-add" />
        </div>
      )}
    </Tab>
  </>
);

/*
  In order to override bootstraps active class on tabs, there is a click event onTabClick, which will get the name of the tab that was clicked
  and then trigger a re-render.  Note in the createTabs method above, where the active class is added or not, based on which tab was clicked.
*/
const LocationsTabs = ({
  id = "tabs",
  className,
  children,
  selectedPropertyId,
  onSubTabsClick,
  selectedSubPath,
}: Props) => (
  <div className="container-fluid mt-4 p-0">
    <div className="row">
      <div className="col">
        <div>
          <div className={classes.tabsContainer}>
            <ul
              className={`nav nav-tabs ${width < 576 ? "flex-sm-column" : "width"}   ${classes.tabs} ${
                className || ""
              }`}
              id={id}
              role="tablist"
            >
              {createTabs(selectedSubPath, selectedPropertyId, onSubTabsClick)}
            </ul>
          </div>
          <div className="tab-content w-100 h-100 d-inline-block" id="locationsTabContent" style={{ height: "auto" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
);
LocationsTabs.defaultProps = {
  id: undefined,
  selectedSubPath: undefined,
  className: undefined,
  children: undefined,
  onSubTabsClick: undefined,
};
const LocationsTabsMemo = memo(LocationsTabs, areEqual);
export { LocationsTabsMemo as LocationsTabs };
