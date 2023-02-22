import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { PillBadge } from 'Components/PillBadge';
import { getDisplayedRolesArray } from 'Utils/helpers';

import classes from './roles.module.css';

interface Props {
  roles: any[];
  className?: string;
}

const Roles = ({ roles, className }: Props) =>
  roles.length > 0 &&
  getDisplayedRolesArray(roles).length > 0 && (
    <div className={classes.roleTags}>
      {getDisplayedRolesArray(roles).map(({ id, name }) => (
        <PillBadge className={className} key={id} text={name} />
      ))}
    </div>
  );

Roles.defaultProps = {
  className: undefined,
};

const RolesMemo = memo(Roles, areEqual);
export { RolesMemo as Roles };
