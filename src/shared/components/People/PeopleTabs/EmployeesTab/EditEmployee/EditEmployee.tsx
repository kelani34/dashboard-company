import React, { memo } from 'react';

import { Modal } from 'Components/Modal';
import { areEqual } from 'Utils/equalityChecks';

import { TextBox } from 'Components/TextBox';
import { Label } from 'Components/Label';
import { Button, PurpleButton } from 'Components/Button';

import { RoleDropDown } from 'Containers/RoleDropDown';

import classes from './editEmployee.module.css';

interface Props {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  roles?: any[];
  email?: string;
  phone?: string;
  extension?: string;
  selectedValue?: number;
  editIsOpen: boolean;
  modalCloseClick?: (e: any) => void;
  deleteEmployeeClick?: (e: any) => void;
  saveChangesClick?: (e: any) => void;
  setSelectedValue?: (e: any) => void;
}
const EditEmployee = ({
  id,
  title,
  editIsOpen,
  firstName,
  lastName,
  roles,
  email,
  phone,
  extension,
  selectedValue,
  modalCloseClick,
  deleteEmployeeClick,
  saveChangesClick,
  setSelectedValue,
}: Props) => (
  <div className={classes.editEmployeeWrapper}>
    <Modal
      id={id && id.toString()}
      classes={classes}
      title={`Edit ${title}`}
      isOpen={editIsOpen}
      modalHeader
      leftHeaderIcon="peoplepink"
      dataBsBackdrop="static"
      dataBsKeyboard="false"
      modalCloseClick={modalCloseClick}
    >
      <form className={classes.editEmployeeForm}>
        <div className={classes.detailItem}>
          <Label ariaLabel="First Name" htmlFor="first-name">
            First Name
          </Label>
          <TextBox
            type="text"
            name="first-name"
            placeholder={firstName}
            readonly
            ariaLabel={`Employee first name is ${firstName}`}
          />
        </div>
        <div className={classes.detailItem}>
          <Label ariaLabel="Last Name" htmlFor="last-name">
            Last Name
          </Label>
          <TextBox
            type="text"
            name="last-name"
            placeholder={lastName}
            readonly
            ariaLabel={`Employee last name is ${lastName}`}
          />
        </div>
        <div className={classes.detailItem}>
          <Label ariaLabel="Employee Role" htmlFor="employee-role">
            Employee Role
          </Label>
          <RoleDropDown
            roles={roles}
            hideDropDown={false}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        </div>
        <div className={classes.detailItem}>
          <Label ariaLabel="Phone" htmlFor="phone">
            Phone Number
          </Label>
          <TextBox
            type="text"
            name="phone"
            placeholder={phone}
            readonly
            ariaLabel={`Employee phone number is ${phone}`}
          />
        </div>
        <div className={classes.detailItem}>
          <Label ariaLabel="Extension" htmlFor="extension">
            Extension
          </Label>
          <TextBox
            type="text"
            name="extension"
            placeholder={extension}
            readonly
            ariaLabel={`Employee extension is ${extension}`}
          />
        </div>
        <div className={classes.detailItem}>
          <Label ariaLabel="Email" htmlFor="email">
            Email
          </Label>
          <TextBox
            type="text"
            name="email"
            placeholder={email}
            readonly
            ariaLabel={`Employee email address is ${email}`}
          />
        </div>
      </form>
      <Button className={`${classes.modalButtons} ${classes.delete}`} onClick={deleteEmployeeClick}>
        Delete
      </Button>
      <PurpleButton className={`${classes.modalButtons} ${classes.save}`} onClick={saveChangesClick} type="submit">
        Save
      </PurpleButton>
    </Modal>
  </div>
);
EditEmployee.defaultProps = {
  email: undefined,
  phone: undefined,
  roles: undefined,
  extension: undefined,
  selectedValue: undefined,
  modalCloseClick: undefined,
  deleteEmployeeClick: undefined,
  saveChangesClick: undefined,
  setSelectedValue: undefined,
};
const EditEmployeeMemo = memo(EditEmployee, areEqual);

export { EditEmployeeMemo as EditEmployee };
