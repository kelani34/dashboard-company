import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import classes from './letterHeader.module.css';

interface Props {
  name: string;
  children: any;
}

const LetterHeader = ({ name, children }: Props) => (
  <>
    <div className={classes.LetterHeaderBase}>
      <h3 className={classes.sectionName}>
        <span>{name}</span>
      </h3>
    </div>
    <div className="d-flex flex-wrap">{children}</div>
  </>
);

const LetterHeaderMemo = memo(LetterHeader, areEqual);

export { LetterHeaderMemo as LetterHeader };
