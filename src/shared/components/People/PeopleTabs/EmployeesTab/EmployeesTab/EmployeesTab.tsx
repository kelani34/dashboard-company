import React, { memo } from 'react';

import { Spinner } from 'Components/Spinner';
import { PurpleButton } from 'Components/Button/PurpleButton';
import { Employees } from 'Containers/People/PeopleTabs/EmployeesTab';
import { InvitePlaceholder } from 'Components/People/PeopleTabs';

import { areEqual } from 'Utils/equalityChecks';

import classes from './employeesTab.module.css';

interface Props {
  employees: any;
  totalEmployees: number;
  fetching: boolean;
  selectCardClick: (employee: any) => void;
  onButtonClick: (e: any) => void;
}

const EmployeesTab = ({ employees, totalEmployees, fetching, selectCardClick, onButtonClick }: Props) => (
  <div className={classes.employeesContent}>
    <div className={`d-flex justify-content-start align-items-center ${classes.contentHeader}`}>
      <h2>Employees</h2>
      {totalEmployees > 1 && (
        <PurpleButton className={classes.inviteButton} onClick={onButtonClick}>
          Invite +
        </PurpleButton>
      )}
    </div>
    {fetching && <Spinner loading />}
    {totalEmployees === 1 && !fetching && (
      <InvitePlaceholder tab="employees" onClickPlaceholderButton={onButtonClick} />
    )}
    <Employees employeesInitials={employees} selectCardClick={selectCardClick} />
  </div>
);

const EmployeesTabMemo = memo(EmployeesTab, areEqual);

export { EmployeesTabMemo as EmployeesTab };
