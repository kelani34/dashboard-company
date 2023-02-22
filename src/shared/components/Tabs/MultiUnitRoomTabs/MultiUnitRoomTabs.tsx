import React, { memo, ReactNode, useState } from "react";

import { areEqual } from "Utils/equalityChecks";
import { width } from "Utils/screen";
import { Tab } from "../Tab";
import classes from "./multiUnitRoom.tabs.module.css";

interface Props {
  id?: string;
  className?: string;
  children?: ReactNode;
  triggerButtonClick?: boolean;
}

/*
  Custom Tab for Locations
*/

const createTabs = (activeTab: string, triggerButtonClick: boolean, onTabClick: (e: any) => void) => (
  <>
    <Tab
      key="all-units-room-tab"
      id="all-units-room-tab"
      className={`${classes.flexCenter} ${classes.navTabs} ${
        activeTab === "all-units-room-tab" ? `active ${classes["active-Tab"]}` : ""
      }`}
      target="all-units-room"
      onClick={onTabClick}
    >
      <span>Units</span>
    </Tab>
    <Tab
      key="all-floors-room-tab"
      id="all-floors-room-tab"
      className={`${classes.flexCenter} ${classes.navTabs} ${
        activeTab === "all-floors-room-tab" ? `active ${classes["active-Tab"]}` : ""
      }`}
      target="all-floors-room"
      triggerButtonClick={triggerButtonClick}
      onClick={onTabClick}
    >
      <span>Floors/Common Areas</span>
    </Tab>
  </>
);

/*
  In order to override bootstraps active class on tabs, there is a click event onTabClick, which will get the name of the tab that was clicked
  and then trigger a re-render.  Note in the createTabs method above, where the active class is added or not, based on which tab was clicked.
*/
const MultiUnitRoomTabs = ({ id = "tabs", className, children, triggerButtonClick }: Props) => {
  // We want to set the initial active tab to the first tab in the incoming tabList
  const [activeTab, setActiveTab] = useState("all-units-room-tab");
  const onTabClick = (e: any) => {
    // Occasionally, e.currentTarget is undefined.  Set the current activeTab if we run into this bug
    setActiveTab(e?.currentTarget?.id || activeTab);
  };

  return (
    <div className="container-fluid mt-4 p-0">
      <div className="row">
        <div className={`col ${classes.tabsContainer}`}>
          <ul
            className={`nav nav-tabs ${width < 576 ? "flex-sm-column" : "width"}   ${classes.tabs} ${className || ""}`}
            id={id}
            role="tablist"
          >
            {createTabs(activeTab, triggerButtonClick, onTabClick)}
          </ul>
        </div>
        <div className="tab-content w-100 h-100 d-inline-block" style={{ height: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

MultiUnitRoomTabs.defaultProps = {
  id: undefined,
  className: undefined,
  children: undefined,
  triggerButtonClick: undefined,
};

const MultiUnitRoomTabsMemo = memo(MultiUnitRoomTabs, areEqual);
export { MultiUnitRoomTabsMemo as MultiUnitRoomTabs };
