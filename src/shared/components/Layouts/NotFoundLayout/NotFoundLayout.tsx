import React, { memo } from 'react';

import { Icon } from 'Components/Icons';
import { PurpleButton } from 'Components/Button/PurpleButton';

import { areEqual } from 'Utils/equalityChecks';

import classes from './notFoundLayout.module.css';

interface Props {
  onFormButtonClick;
}

const NotFoundLayout = ({ onFormButtonClick }: Props) => (
  <div>
    <Icon className={`${classes.logo}`} type="logo" />
    <div className={classes.container}>
      <div className={classes.header}>Page Not Found</div>

      <div className={classes.buttonContainer}>
        <PurpleButton type="submit" onClick={onFormButtonClick}>
          Go Back To Homepage
        </PurpleButton>
      </div>
      <Icon className={`${classes.notFoundIcon}`} type="notfound" />
      <div className={classes.description}>Sorry, we couldn't find the page you were looking for.</div>
      <div className={classes.support}>
        If you need any further assistance please contact our
        <br />
        support team at - support@rocketplantech.com
      </div>
    </div>
  </div>
);

const NotFoundLayoutMemo = memo(NotFoundLayout, areEqual);

export { NotFoundLayoutMemo as NotFoundLayout };
