import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import CanadaFlag from '../../../Assets/canadaflag.svg';
import UnitedStatesFlag from '../../../Assets/unitedstatesflag.svg';
import UnitedKingdomFlag from '../../../Assets/unitedkingdomflag.svg';
import NewZealandFlag from '../../../Assets/newzealandflag.svg';
import AustraliaFlag from '../../../Assets/australiaflag.svg';

// Custom css
import classes from './countryFlag.module.css';

interface Props {
  className?: string;
  id?: string;
  svgItem?: number;
}

const CountryFlagSvg = ({ className = '', id, svgItem }: Props) => {
  switch (svgItem) {
    case 2:
      return <CanadaFlag id={id} className={`${classes.flagIconBase} ${className || ''}`} />;
    case 3:
      return <UnitedKingdomFlag id={id} className={`${classes.flagIconBase} ${className || ''}`} />;
    case 4:
      return <NewZealandFlag id={id} className={`${classes.flagIconBase} ${className || ''}`} />;
    case 5:
      return <AustraliaFlag id={id} className={`${classes.flagIconBase} ${className || ''}`} />;

    default:
      return <UnitedStatesFlag id={id} className={`${classes.flagIconBase} ${className || ''}`} />;
  }
};

CountryFlagSvg.defaultProps = {
  svgItem: 1,
  className: undefined,
  id: undefined,
};

const CountryFlagSvgMemo = memo(CountryFlagSvg, areEqualShallow);

export { CountryFlagSvgMemo as CountryFlagSvg };
