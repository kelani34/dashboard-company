import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { TextBox } from 'Components/TextBox';
import { Icon } from 'Components/Icons';
import { DropDown } from 'Components/DropDown';
import { UserRoleModal } from 'Containers/User/Models/UserModel';
import formClasses from 'Themes/form/form.module.css';
import classes from './roleDropDown.module.css';

interface Props {
  className?: string;
  roleSelect: string;
  roles: Array<UserRoleModal>;
  selectedRoleId: number;
  invalid?: boolean;
  showDropDown: boolean;
  onSelectItem: (e: any) => void;
  onClickIcon: (e: any) => void;
}

const RoleDropDown = ({
  className,
  roleSelect,
  roles,
  selectedRoleId,
  invalid,
  showDropDown,
  onSelectItem,
  onClickIcon,
}: Props) => (
  <div className={`dropdown ${className || ''} ${classes.roleSelectBase}`}>
    <TextBox
      name="roleSelect"
      type="text"
      ariaLabel="Select a Role"
      className={`${formClasses.validateField} ${invalid ? formClasses.invalidField : formClasses.validField}`}
      value={roleSelect}
      readonly
      autoComplete="off"
      placeholder={roleSelect}
    />
    <Icon className={classes.icon} type={showDropDown ? 'caretup' : 'caretdown'} onClick={onClickIcon} />
    {roles && (
      <DropDown
        className={classes.dropDown}
        id="roleDropDown"
        items={roles}
        selected={selectedRoleId}
        onSelectItem={onSelectItem}
        showDropDown={showDropDown}
      />
    )}
  </div>
);

RoleDropDown.defaultProps = {
  className: undefined,
  invalid: false,
};

const RoleDropDownMemo = memo(RoleDropDown, areEqual);

export { RoleDropDownMemo as RoleDropDown };
