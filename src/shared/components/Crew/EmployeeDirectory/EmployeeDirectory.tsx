import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { UserModel } from 'Containers/User/Models/UserModel';
import { PurpleButton } from 'Components/Button';

import { EmployeeRow } from 'Components/Crew';
import { Icon } from 'Components/Icons';
import classes from './employeeDirectory.module.css';

interface Props {
  employees: Array<UserModel>;
  selectedMembers: any[];
  showError: boolean;
  disableButton: boolean;
  searchValue: string;
  onClickMemberRow: (e: any) => void;
  onClickSelectCrew: (e: any) => void;
}

const EmployeeDirectory = ({
  employees,
  selectedMembers,
  showError,
  disableButton,
  searchValue,
  onClickMemberRow,
  onClickSelectCrew,
}: Props) => (
  <div className={classes.employeeDirectoryBase}>
    {showError && <p className={classes.errorMessage}>Please select one or more team members</p>}

    <p className={classes.title}>Employee Directory</p>

    {employees.length > 0 &&
      employees.map(
        ({ id, first_name: firstName, last_name: lastName, full_name: fullName, avatar_url: avatar, roles }) => (
          <EmployeeRow
            key={id}
            id={id.toString()}
            firstName={firstName}
            lastName={lastName}
            fullName={fullName}
            avatar={avatar}
            roles={roles}
            selectedMembers={selectedMembers}
            onClickMemberRow={onClickMemberRow}
          />
        )
      )}

    {employees.length === 0 && searchValue.length > 0 && (
      <div className={classes.noEmployeesContainer}>
        <p className={classes.errorMessage}>Please find an employee and select them to add them to the project.</p>
        <div className={classes.noMatchContainer}>
          <div className={classes.searchIcon}>
            <Icon type="search" />
          </div>
          <p className={classes.noEmployeesText}>No Contacts found matching:</p>
          <p className={classes.searchText}>{`"${searchValue}"`}</p>
        </div>
        <div className={classes.buttonContainer}>
          <PurpleButton onClick={onClickSelectCrew} disabled={disableButton}>
            Select Crew
          </PurpleButton>
        </div>
      </div>
    )}

    {employees.length > 0 && (
      <div className={classes.buttonContainer}>
        <PurpleButton onClick={onClickSelectCrew} disabled={disableButton}>
          Select Crew
        </PurpleButton>
      </div>
    )}
  </div>
);

const EmployeeDirectoryMemo = memo(EmployeeDirectory, areEqual);

export { EmployeeDirectoryMemo as EmployeeDirectory };
