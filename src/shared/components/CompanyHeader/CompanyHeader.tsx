import { Icon } from 'Components/Icons';
import React, { memo } from 'react';
import { areEqualShallow } from 'Utils/equalityChecks';

interface Props {
  iconClassName: string;
  iconType?: string;
}
const CompanyHeader = ({ iconClassName, iconType }: Props) => <Icon className={iconClassName} type={iconType} />;

CompanyHeader.defaultProps = {
  iconType: 'logo',
};

const CompanyHeaderMemo = memo(CompanyHeader, areEqualShallow);

export { CompanyHeaderMemo as CompanyHeader };
