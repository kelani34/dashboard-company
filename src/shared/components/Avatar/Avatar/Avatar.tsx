import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import classes from './avatar.module.css';

interface Props {
  className?: string;
  avatar: string;
}

const Avatar = ({ className, avatar }: Props) => (
  <img className={className || classes.avatarDefault} alt="avatar" src={avatar} />
);

Avatar.defaultProps = {
  className: '',
};

const AvatarMemo = memo(Avatar, areEqual);
export { AvatarMemo as Avatar };
