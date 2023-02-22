import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { PropertyDataEdit } from 'Containers/ProjectData';
import { Header } from '../Header';
import { PropertyDataView } from './PropertyDataView';
import classes from './propertyData.module.css';

interface Props {
  project: any;
  dateCreated: string;
  projectId: number;
  projectUid: string;
  classificationName: string;
  projectTypeNameSelected: string;
  isResidential: boolean;
  isCommercial: boolean;
  buildingName: string;
  yearBuilt: string;
  asbestosStatusName: string;
  asbestosStatusId: number;
  editIsOpen: boolean;
  projectTypeId: number;
  projectTypeName: string;
  onEditButtonClick: (e: any) => void;
}

const PropertyData = ({
  project,
  dateCreated,
  projectId,
  projectUid,
  classificationName,
  projectTypeNameSelected,
  isResidential,
  isCommercial,
  buildingName,
  yearBuilt,
  asbestosStatusName,
  asbestosStatusId,
  editIsOpen,
  projectTypeId,
  projectTypeName,
  onEditButtonClick,
}: Props) => (
  <div className="d-flex flex-column justify-content-start align-items-center w-100">
    <div className={`${classes.propertyDataBase}`}>
      <Header title="Property Data" editIsOpen={editIsOpen} onEditButtonClick={onEditButtonClick} />
      <div className={`d-flex justify-content-between align-items-baseline ${classes.subHeader}`}>
        <div className={classes.mainTitle}>Property Information</div>
        <div className={classes.secondaryTitle}>Information for reports</div>
      </div>

      <div className={`d-flex justify-content-between align-items-center ${classes.projectInfo}`}>
        <div className={classes.projectUid}>{projectUid}</div>
        <div className={classes.dateCreated}>{dateCreated}</div>
      </div>

      <div className={`${classes.propertyDataContent}`}>
        {editIsOpen ? (
          <PropertyDataEdit
            projectId={projectId}
            isResidential={isResidential}
            isCommercial={isCommercial}
            buildingName={buildingName}
            yearBuilt={yearBuilt}
            asbestosStatusId={asbestosStatusId}
            projectTypeId={projectTypeId}
            projectTypeName={projectTypeName}
          />
        ) : (
          <PropertyDataView
            project={project}
            selectedProjectType={projectTypeNameSelected}
            selectedClassification={classificationName}
            selectedAsbestosStatus={asbestosStatusName}
            selectedYearBuilt={yearBuilt}
            buildingName={buildingName}
          />
        )}
      </div>
    </div>
  </div>
);

const PropertyDataMemo = memo(PropertyData, areEqual);

export { PropertyDataMemo as PropertyData };
