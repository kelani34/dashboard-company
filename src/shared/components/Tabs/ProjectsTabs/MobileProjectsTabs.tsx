import React, { memo, ReactNode, useState } from "react";

import { Icon } from "Components/Icons";

import { areEqual } from "Utils/equalityChecks";
import { width } from "Utils/screen";
import { Tab } from "../Tab";
import classes from "./mobileProjectsTabs.module.css";

interface Props {
  id?: string;
  className?: string;
  children?: ReactNode;
}

const createTabs = (activeTab: string, onTabClick: (e: any) => void) => (
  <>
    <Tab
      key="wip-projects-tab"
      id="wip-projects-tab"
      className={`${classes.tab} ${classes.flexCenter} ${
        activeTab === "wip-projects-tab" ? `active ${classes["active-Tab"]}` : ""
      } flex-fill`}
      onClick={onTabClick}
    >
      WIP
    </Tab>
    <Tab
      key="completed-projects-tab"
      id="completed-projects-tab"
      className={`${classes.tab} ${classes.flexCenter} ${
        activeTab === "completed-projects-tab" ? `active ${classes["active-Tab"]}` : ""
      } flex-fill`}
      onClick={onTabClick}
    >
      Completed
    </Tab>
  </>
);

const MobileProjectsTabs = ({ id = "tabs", className, children }: Props) => {
  // We want to set the initial active tab to the first tab in the incoming tabList
  const [activeTab, setActiveTab] = useState("wip-projects-tab");
  const onTabClick = (e: any) => {
    // Occasionally, e.currentTarget is undefined.  Set the current activeTab if we run into this bug
    setActiveTab(e?.currentTarget?.id || activeTab);
  };

  return (
    <div className={`container-fluid ${classes.screenContainer}`}>
      <div className="row">
        <div className="col">
          <div>
            <div className={classes.tabsContainer}>
              <ul
                className={`nav nav-tabs ${width < 576 ? "flex-row" : "width"} ${classes.tabs} d-flex ${
                  className || ""
                }`}
                id={id}
                role="tablist"
              >
                {createTabs(activeTab, onTabClick)}
              </ul>
            </div>

            <div className={classes.menuContainer}>
              <div className="dropdown">
                <button
                  className={`btn btn-secondary dropdown-toggle ${classes.sortFilterButton}`}
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sort By
                  <Icon type="dropdownArrow" className={classes.iconPadding} />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                </ul>
              </div>

              <div className="filter">
                <button
                  className={`btn btn-secondary dropdown-toggle ${classes.sortFilterButton}`}
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Filter
                  <Icon type="funnel" className={classes.iconPadding} />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="tab-content w-100 h-100 d-inline-block d-flex flex-column"
              id="myTabContent"
              style={{ height: "100%" }}
            >
              {children}
              <div className={`d-flex flex-column ${classes.flexCenter}`}>
                <div className={classes.placeholderText}>No projects yet. Create a new project.</div>
                <div>
                  <Icon type="rocketEmblem" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MobileProjectsTabs.defaultProps = {
  id: undefined,
  className: undefined,
  children: undefined,
};

const mobileProjectsTabsMemo = memo(MobileProjectsTabs, areEqual);
export { mobileProjectsTabsMemo as MobileProjectsTabs };
