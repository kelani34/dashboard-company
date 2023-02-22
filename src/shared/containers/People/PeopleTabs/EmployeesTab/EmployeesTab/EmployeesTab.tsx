import React, { memo, useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';
import { countries } from 'Utils/data';

import { InfoCardModal, EditEmployee, DeleteToast } from 'Components/People/PeopleTabs';
import { TabContent } from 'Components/Tabs';
import { EmployeesTab } from 'Components/People';
import { DeleteCardModal } from 'Components/People/PeopleTabs/PeopleList/DeleteCardModal';
import { InviteEmployees } from 'Containers/InviteEmployees';
import { formatPhoneNumberInternational } from 'Utils/helpers';
import { isCompanyAdmin } from 'Utils/roles';

import { firstCompanyIdSelector } from 'Containers/Projects/selectors';
import { useUser } from 'Context/User';
import { UserModel } from 'Containers/User/Models/UserModel';
import { companyEmployeeRolesSelector } from 'Containers/User/selector';
import { listCompanyEmployeeRoles } from 'Containers/User/actions';
import {
  employeesInitialsSelector,
  totalEmployeesSelector,
  selectedEmployeeSelector,
  employeeDeletedSelector,
  fetchingCompanyEmployeesSelector,
} from '../selectors';
import {
  listCompanyEmployees,
  setEmployeeSelected,
  deleteEmployee,
  syncRoleToEmployee,
  detachRoleFromEmployee,
  setDeletedEmployee,
} from '../actions';

const EmployeesTabContainer = () => {
  const dispatch = useDispatch();

  const mounted = useRef(true);

  const { id: userId }: UserModel = useUser();
  const user: UserModel = useUser();
  const [isAdmin] = useState(isCompanyAdmin(user.roles));

  const firstCompanyId = useSelector(firstCompanyIdSelector, areEqual);
  const employeesInitials = useSelector(employeesInitialsSelector, areEqual);
  const totalEmployees = useSelector(totalEmployeesSelector, areEqual);
  const { id, email, firstName, lastName, fullName, avatar, roles } = useSelector(selectedEmployeeSelector, areEqual);

  const [selectedValue, setSelectedValue] = useState(0);
  const [updatedRole, setUpdatedRole] = useState(false);

  const { roles: currentRoles } = useSelector(selectedEmployeeSelector, areEqual);
  const [currentRole] = currentRoles;
  const allRoles = useSelector(companyEmployeeRolesSelector, areEqual);
  const employeeDeleted = useSelector(employeeDeletedSelector, areEqual);

  const fetching = useSelector(fetchingCompanyEmployeesSelector, areEqual);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isOpenInviteEmployees, setIsOpenInviteEmployees] = useState(false);
  const [countryFlag, setCountryFlag] = useState('usa');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [showDeletedToast, setShowDeletedToast] = useState(false);

  /* eslint-disable */
  const [empPhone, setEmpPhone] = useState(null);

  // API call
  const getEmployees = useCallback(async () => {
    await dispatch(listCompanyEmployees(firstCompanyId, userId));
    if (mounted) {
      setUpdatedRole(false);
    }
  }, [firstCompanyId, userId]);

  useEffect(() => {
    if (totalEmployees === 0 && firstCompanyId) {
      dispatch(listCompanyEmployees(firstCompanyId, userId));
    }
  }, [totalEmployees, firstCompanyId, userId]);

  useEffect(() => {
    if (firstCompanyId) {
      dispatch(listCompanyEmployeeRoles(firstCompanyId));
    }
  }, [firstCompanyId]);

  useEffect(() => {
    if (employeeDeleted) {
      // reload employee list
      dispatch(listCompanyEmployees(firstCompanyId, userId));

      // handle toast
      setShowDeletedToast(true);

      setTimeout(() => setShowDeletedToast(false), 1500);

      // reset deleted status
      dispatch(setDeletedEmployee(''));
    }
  }, [employeeDeleted, firstCompanyId, userId]);

  // get country code and flag
  useEffect(() => {
    if (user?.id) {
      const { companies } = user;
      if (companies.length > 0) {
        const [company] = companies;
        const { country_alpha_2: countryAlphaTwo } = company;

        if (empPhone?.value) {
          setPhoneNumber(formatPhoneNumberInternational(empPhone.value));
        } else {
          setPhoneNumber('');
        }

        const countryAlpha = countryAlphaTwo;
        const companyCountry = countries.find((country) => country.alpha_2 === countryAlpha);

        if (companyCountry?.id) {
          const { flag } = companyCountry;
          setCountryFlag(flag);
        }
      }
    }
  }, [user, empPhone]);

  useEffect(() => {
    if (updatedRole) {
      mounted.current = true;
      (async function fetchData() {
        await getEmployees();
      })();
    }
    return () => {
      if (mounted && updatedRole) {
        mounted.current = false;
      }
    };
  }, [updatedRole]);

  const setModalStatus = useCallback(() => {
    setIsModalOpen((isModalOpen: boolean) => !isModalOpen);
  }, []);

  const setEditModalStatus = useCallback(() => {
    setIsEditModalOpen((isEditModalOpen: boolean) => !isEditModalOpen);
  }, []);
  const setDeleteModalStatus = useCallback(() => {
    setIsDeleteModalOpen((isDeleteModalOpen: boolean) => !isDeleteModalOpen);
  }, []);

  const modalCloseClick = useCallback(
    (e: any) => {
      e.preventDefault();
      setIsModalOpen(false);
      setIsEditModalOpen(false);
      setIsDeleteModalOpen(false);
    },
    [isModalOpen, isEditModalOpen, isDeleteModalOpen]
  );

  const selectCardClick = useCallback((employee: any) => {
    setModalStatus();
    dispatch(setEmployeeSelected(employee));

    const [phoneObject] = employee.phones;
    if (phoneObject?.id) {
      setEmpPhone(phoneObject);
    }
  }, []);

  const openEditEmployeeModal = useCallback(
    (e: any) => {
      e.preventDefault();
      setIsModalOpen(false);
      setEditModalStatus();
    },
    [isModalOpen, isEditModalOpen]
  );

  //deleteCardClick should be passed to Edit Employee modal that contains Delete Button
  const deleteCardClick = useCallback((e: any) => {
    e.preventDefault();
    setIsEditModalOpen(false);
    setDeleteModalStatus();
  }, []);

  const deleteEmployeeClick = useCallback(
    (e: any) => {
      e.preventDefault();
      dispatch(deleteEmployee(firstCompanyId, id));
      setIsDeleteModalOpen(false);
    },
    [firstCompanyId, id]
  );

  const onClickPlaceholderButton = useCallback((e: any) => {
    e.preventDefault();
    setIsOpenInviteEmployees(true);
  }, []);

  const modalCloseClickInviteEmployees = useCallback((e: any) => {
    e.preventDefault();
    setIsOpenInviteEmployees(false);
  }, []);

  const closeToast = useCallback((e: any) => {
    e.preventDefault();
    setShowDeletedToast(false);
  }, []);

  const onRoleUpdated = useCallback(() => {
    setIsEditModalOpen(false);
    setUpdatedRole(true);
  }, []);

  // currently only configured for one role per employee
  const changeEmployeeRoleClick = useCallback(
    (e: any) => {
      e.preventDefault();
      if (currentRole?.id !== selectedValue && id) {
        dispatch(detachRoleFromEmployee(firstCompanyId, id, currentRole.id));
        dispatch(syncRoleToEmployee(firstCompanyId, id, selectedValue));
        onRoleUpdated();
      }
    },

    [firstCompanyId, id, currentRole, selectedValue]
  );

  return (
    <TabContent key="tab-content-employees-people" id="employees" className="show active position-relative">
      <EmployeesTab
        employees={employeesInitials}
        totalEmployees={totalEmployees}
        fetching={fetching}
        selectCardClick={selectCardClick}
        onButtonClick={onClickPlaceholderButton}
      />

      <InviteEmployees isOpen={isOpenInviteEmployees} modalCloseClick={modalCloseClickInviteEmployees} />

      <InfoCardModal
        id={id}
        title="Employee"
        avatar={avatar}
        firstName={firstName}
        lastName={lastName}
        name={fullName}
        email={email}
        flag={countryFlag}
        phone={phoneNumber}
        extension={empPhone?.extension}
        roles={roles}
        isAdmin={isAdmin}
        isOpen={isModalOpen}
        modalCloseClick={modalCloseClick}
        onEditButtonClick={openEditEmployeeModal}
      />

      <EditEmployee
        id={id}
        title="Employee"
        editIsOpen={isEditModalOpen}
        firstName={firstName}
        lastName={lastName}
        roles={allRoles}
        email={email}
        phone={empPhone?.value}
        extension={empPhone?.extension}
        selectedValue={selectedValue}
        deleteEmployeeClick={deleteCardClick}
        modalCloseClick={modalCloseClick}
        saveChangesClick={changeEmployeeRoleClick}
        setSelectedValue={setSelectedValue}
      />
      <DeleteCardModal
        id={id}
        title="employee"
        name={fullName}
        isOpen={isDeleteModalOpen}
        modalCloseClick={modalCloseClick}
        onDeleteButtonClick={deleteEmployeeClick}
      />
      {employeeDeleted && (
        <DeleteToast isDisplayed={showDeletedToast} message={`${firstName} Deleted`} closeToast={closeToast} />
      )}
    </TabContent>
  );
};

EmployeesTabContainer.defaultProps = {};

const EmployeesTabContainerMemo = memo(EmployeesTabContainer, areEqual);

export { EmployeesTabContainerMemo as EmployeesTab };
