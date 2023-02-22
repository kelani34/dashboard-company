import React, { memo, useCallback, useEffect, useState } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { useUser } from 'Context/User';

import { useHistory } from 'react-router-dom';
import { convertFirstLetterUppercase, getUnixTimeFromString } from 'Utils/helpers';

import { AvatarOrInitials } from 'Components/Avatar';
import { Nav } from 'Components/Nav';
import { useIntercom } from 'react-use-intercom';
import { UserModel } from 'Containers/User/Models/UserModel';

interface Props {
  toggleSideBar: (e: any) => void;
}

const NavContainer = ({ toggleSideBar }: Props) => {
  const history = useHistory();

  const user: UserModel = useUser();

  const { boot } = useIntercom();

  const [avatar, setAvatar] = useState('');
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (user?.id) {
      const { avatar_url: avatar, first_name: firstName } = user;
      setAvatar(avatar);
      setFirstName(convertFirstLetterUppercase(firstName));
    }
  }, [user]);

  const toAccountOnClick = useCallback((e: any) => {
    e.preventDefault();
    history.push('/user/account');
  }, []);

  // boot intercom with props
  useEffect(() => {
    if (user?.id) {
      const { id, full_name: fullName, email, created_at: created } = user;

      const userId = id.toString();
      const name = fullName;
      const createdAt = getUnixTimeFromString(created).toString();

      boot({
        userId,
        name,
        email,
        createdAt,
        customLauncherSelector: '#intercomSupport',
        hideDefaultLauncher: true,
      });
    }
  }, [user]);

  return (
    <Nav
      userAvatar={<AvatarOrInitials avatar={avatar} firstName={firstName} />}
      firstName={firstName}
      toggleSideBar={toggleSideBar}
      toAccountOnClick={toAccountOnClick}
    />
  );
};

const NavContainerMemo = memo(NavContainer, areEqual);

export { NavContainerMemo as NavContainer };
