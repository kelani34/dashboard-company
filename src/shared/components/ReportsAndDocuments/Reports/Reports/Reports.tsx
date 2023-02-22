import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { ReportsTable } from 'Containers/ReportsAndDocuments';
import { PurpleButton } from 'Components/Button';
import { ProjectDataHeader } from 'Containers/ProjectData';

import classes from './reports.module.css';

interface Props {
  onClickGenerateReport: (e: any) => void;
}

const Reports = ({ onClickGenerateReport }: Props) => (
  <div className={`d-flex flex-column ${classes.reports}`}>
    <div className={`d-flex justify-content-between ${classes.headerContainer}`}>
      <div className={classes.header}>
        <ProjectDataHeader />
      </div>
      <PurpleButton className={classes.button} outlined onClick={onClickGenerateReport}>
        Generate Report
      </PurpleButton>
    </div>
    <ReportsTable />
  </div>
);

const ReportsMemo = memo(Reports, areEqual);

export { ReportsMemo as Reports };
