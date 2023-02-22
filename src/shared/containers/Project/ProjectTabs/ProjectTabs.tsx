import React, { memo, ReactNode } from "react";
// import { useSelector } from "react-redux";

import { LocationsTabs, TabContent, ProjectTabMenu } from "Components/Tabs";
import { areEqual } from "Utils/equalityChecks";
import { useSelector } from "react-redux";

interface Props {
  selectedMainTab?: string;
  selectedSubPath?: string;
  allLocationsChildren?: ReactNode;
  addLocationsChildren?: ReactNode;
  onSubTabsClick?: (e: any) => void;
  onMainTabsClick?: (e: any) => void;
}
const selectedPropertyIdSelector = ({
  project: {
    property: { id },
  },
}) => id;

const ProjectTabsContainer = ({
  selectedMainTab,
  selectedSubPath,
  allLocationsChildren,
  addLocationsChildren,
  onSubTabsClick,
  onMainTabsClick,
}: Props) => {
  const selectedPropertyId = useSelector(selectedPropertyIdSelector, areEqual);
  return (
    <ProjectTabMenu id="project-tabs" selectedMainTab={selectedMainTab} onMainTabsClick={onMainTabsClick}>
      <TabContent
        key="tab-content-project-dash"
        id="project-dash"
        className={`pt-3 ${selectedMainTab === "project-dash-tab" ? "show active" : ""}`}
      >
        <div>Projects dashboard content placeholder</div>
      </TabContent>
      <TabContent
        key="tab-content-photo-center"
        id="photo-center"
        className={`pt-3 ${selectedMainTab === "photo-center-tab" ? "show active" : ""}`}
      >
        <LocationsTabs
          id="locations-tabs"
          selectedPropertyId={selectedPropertyId}
          selectedSubPath={selectedSubPath}
          onSubTabsClick={onSubTabsClick}
        >
          {allLocationsChildren && (
            <TabContent
              key="tab-content-all-locations"
              id="all-locations"
              className={`pt-3 ${selectedSubPath === "all-locations-tab" ? "show active" : ""}`}
            >
              {allLocationsChildren}
            </TabContent>
          )}
          {addLocationsChildren && (
            <TabContent
              key="tab-content-add-locations"
              id="add-locations"
              className={`pt-3 ${selectedSubPath === "add-locations-tab" ? "show active" : ""}`}
            >
              {addLocationsChildren}
            </TabContent>
          )}
        </LocationsTabs>
      </TabContent>
    </ProjectTabMenu>
  );
};
ProjectTabsContainer.defaultProps = {
  selectedMainTab: null,
  selectedSubPath: null,
  allLocationsChildren: undefined,
  addLocationsChildren: undefined,
  onSubTabsClick: undefined,
  onMainTabsClick: undefined,
};

const ProjectTabsContainerMemo = memo(ProjectTabsContainer, areEqual);

export { ProjectTabsContainerMemo as ProjectTabs };
