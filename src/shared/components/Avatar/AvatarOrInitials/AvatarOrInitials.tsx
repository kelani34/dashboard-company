import React, { memo } from 'react';

import { initials } from 'Utils/helpers';
import { areEqual } from 'Utils/equalityChecks';

import { Avatar } from 'Components/Avatar';

import classes from './avatarOrInitials.module.css';

interface Props {
  avatar: string;
  firstName: string;
  lastName?: string;
  avatarClassName?: string;
}

const AvatarOrInitials = ({ avatar, firstName, lastName, avatarClassName }: Props) =>
  typeof avatar === 'string' && avatar.length > 0 ? (
    <Avatar className={avatarClassName} avatar={avatar} />
  ) : (
    <div className={!avatarClassName ? classes.initials : avatarClassName}>{initials(firstName, lastName)}</div>
  );

AvatarOrInitials.defaultProps = {
  avatarClassName: undefined,
  lastName: '',
};

const AvatarOrInitialsMemo = memo(AvatarOrInitials, areEqual);

export { AvatarOrInitialsMemo as AvatarOrInitials };
