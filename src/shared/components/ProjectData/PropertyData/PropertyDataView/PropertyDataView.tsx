import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import classes from './propertyDataView.module.css';

interface Props {
  project: any;
  selectedProjectType?: string;
  selectedClassification?: string;
  selectedAsbestosStatus?: string;
  selectedYearBuilt?: string;
  buildingName?: string;
}
const PropertyDataView = ({
  project,
  selectedProjectType,
  selectedClassification,
  selectedAsbestosStatus,
  selectedYearBuilt,
  buildingName,
}: Props) => (
  <>
    {project?.id && (
      <ul className="list-group">
        <li className={`list-group-item ${classes.propertyDataViewItem}`}>
          Project Type:
          <div className={classes.dataText}>{selectedProjectType || <span>No Selected Project Type</span>}</div>
        </li>
        <li className={`list-group-item ${classes.propertyDataViewItem}`}>
          Project Classification:
          <div className={classes.dataText}>
            {selectedClassification || <span>No Selected Project Classification</span>}
          </div>
        </li>
        <li className={`list-group-item ${classes.propertyDataViewItem}`}>
          Asbestos Status:
          <div className={classes.dataText}>{selectedAsbestosStatus || <span>No Selected Asbestos Status</span>}</div>
        </li>
        <li className={`list-group-item ${classes.propertyDataViewItem}`}>
          Year Built:
          <div className={classes.dataText}>{selectedYearBuilt || <span>No Selected Year Built</span>}</div>
        </li>
        <li className={`list-group-item ${classes.propertyDataViewItem}`}>
          Building Name:
          <div className={classes.dataText}>{buildingName || <span>No Building Name</span>}</div>
        </li>
      </ul>
    )}{' '}
  </>
);

PropertyDataView.defaultProps = {
  selectedProjectType: undefined,
  selectedClassification: undefined,
  selectedAsbestosStatus: undefined,
  selectedYearBuilt: undefined,
  buildingName: undefined,
};

const PropertyDataViewMemo = memo(PropertyDataView, areEqual);

export { PropertyDataViewMemo as PropertyDataView };
