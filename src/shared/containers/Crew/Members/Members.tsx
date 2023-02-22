import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { UserModel } from 'Containers/User/Models/UserModel';
import { countries } from 'Utils/data';

import { Member } from 'Containers/Crew';
import { RemoveMemberModal } from 'Components/Crew/RemoveMemberModal';
import { AvatarOrInitials } from 'Components/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { listProjectMembers, removeEmployeeFromProject, setEmployeeRemoved } from 'Containers/Crew/actions';
import { projectIdSelector } from 'Containers/RocketScan/selectors';
import { employeeRemovedSelector, removingEmployeeSelector } from 'Containers/Crew/selectors';
import { useUser } from 'Context/User';
import { formatPhoneNumberInternational } from 'Utils/helpers';
import classes from './members.module.css';

interface Props {
  members: Array<UserModel>;
}

const MembersContainer = ({ members }: Props) => {
  const dispatch = useDispatch();

  // user object
  const { id: userId } = useUser();
  const user: UserModel = useUser();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [extension, setExtension] = useState('');
  const [countryFlag, setCountryFlag] = useState('usa');
  const [roles, setRoles] = useState([]);

  const projectId = useSelector(projectIdSelector, areEqual);
  const employeeRemoved = useSelector(employeeRemovedSelector, areEqual);
  const fetching = useSelector(removingEmployeeSelector, areEqual);

  const onClickMember = useCallback(
    ({
      id,
      first_name: firstName,
      last_name: lastName,
      full_name: fullName,
      avatar_url: avatar,
      email,
      phones,
      roles,
    }: UserModel) => {
      setId(id.toString());
      setName(fullName);
      setAvatar(avatar);
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      const [firstPhone] = phones;
      const { value, extension } = firstPhone;
      setPhone(formatPhoneNumberInternational(value));
      setExtension(extension);
      setRoles(roles);

      setIsOpenModal(true);
    },
    []
  );

  const onModalCloseClick = useCallback((e: any) => {
    e.preventDefault();
    setIsOpenModal(false);
  }, []);

  const onClickRemoveProject = useCallback(() => {
    dispatch(removeEmployeeFromProject(projectId, id));
  }, [projectId, id]);

  useEffect(() => {
    if (employeeRemoved) {
      setIsOpenModal(false);
    }
  }, [employeeRemoved]);

  useEffect(() => {
    if (!isOpenModal && employeeRemoved) {
      dispatch(listProjectMembers(projectId, userId));
      dispatch(setEmployeeRemoved(name));
    }

    return () => {
      if (!isOpenModal && employeeRemoved) {
        dispatch(setEmployeeRemoved(undefined));
      }
    };
  }, [isOpenModal, employeeRemoved]);

  // get country code and flag
  useEffect(() => {
    if (user?.id) {
      const { companies } = user;
      if (companies.length > 0) {
        const [company] = companies;
        const { country_alpha_2: countryAlphaTwo } = company;

        const countryAlpha = countryAlphaTwo;
        const companyCountry = countries.find((country) => country.alpha_2 === countryAlpha);

        if (companyCountry?.id) {
          const { flag } = companyCountry;
          setCountryFlag(flag);
        }
      }
    }
  }, [user, phone]);

  return (
    <>
      <div className={classes.membersBase}>
        {members.map((member) => (
          <Member key={member.id} member={member} onClickMember={onClickMember} />
        ))}
      </div>
      <RemoveMemberModal
        id={id}
        name={name}
        flag={countryFlag}
        phone={phone}
        email={email}
        extension={extension}
        roles={roles}
        avatar={
          <AvatarOrInitials
            avatarClassName={classes.avatar}
            avatar={avatar || ''}
            firstName={firstName}
            lastName={lastName}
          />
        }
        isOpen={isOpenModal}
        fetching={fetching}
        modalCloseClick={onModalCloseClick}
        onClickRemoveProject={onClickRemoveProject}
      />
    </>
  );
};

const MembersContainerMemo = memo(MembersContainer, areEqual);

export { MembersContainerMemo as MembersContainer };
