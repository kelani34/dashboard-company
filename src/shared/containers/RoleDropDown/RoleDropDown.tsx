import React, { memo, useCallback, useEffect, useState } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { RoleDropDown } from 'Components/RoleDropDown';

import { selectedEmployeeSelector } from 'Containers/People/PeopleTabs/EmployeesTab/selectors';
import { useSelector } from 'react-redux';

interface Props {
  roles: any[];
  selectedValue: number;
  invalid?: boolean;
  hideDropDown: boolean;
  setSelectedValue?: (e: any) => void;
}

const RoleDropDownContainer = ({ roles, selectedValue, invalid, hideDropDown, setSelectedValue }: Props) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);

  const { roles: currentRoles } = useSelector(selectedEmployeeSelector, areEqual);
  const [currentRole] = currentRoles;

  useEffect(() => {
    if (currentRole?.id) {
      const { id, display_name: displayName } = currentRole;

      setSelectedValue(id);
      setSelectedRole(displayName);
    }
  }, [currentRole]);

  useEffect(() => {
    if (hideDropDown) {
      setShowDropDown(false);
    }
  }, [hideDropDown]);

  const onSelectItem = useCallback(
    (id: number) => {
      setSelectedValue(id);

      if (roles.length > 0) {
        const role = roles.find((role: any) => role.id === id);

        setSelectedValue(role.id);
        setSelectedRole(role.display_name);
      }

      setShowDropDown(false);
    },
    [roles]
  );

  const onClickIcon = useCallback(() => {
    setShowDropDown((prevState) => !prevState);
  }, []);

  return (
    <RoleDropDown
      roleSelect={selectedRole}
      selectedRoleId={selectedValue}
      roles={roles}
      showDropDown={showDropDown}
      invalid={invalid}
      onSelectItem={onSelectItem}
      onClickIcon={onClickIcon}
    />
  );
};

RoleDropDownContainer.defaultProps = {
  invalid: false,
  setSelectedValue: undefined,
};

const RoleDropDownContainerMemo = memo(RoleDropDownContainer, areEqual);

export { RoleDropDownContainerMemo as RoleDropDown };
