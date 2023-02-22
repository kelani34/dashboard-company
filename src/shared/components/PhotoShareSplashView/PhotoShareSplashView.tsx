import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';
import { PurpleButton } from 'Components/Button';
import { Avatar } from 'Components/Avatar';

import classes from './photoShareSplashView.module.css';

interface Props {
  logo: string;
  website: string;
  phone: string;
  senderName: string;
  companyName: string;
  projectAddress: string;
  error: boolean;
  onButtonClick: () => void;
}

const PhotoShareSplashView = ({
  logo,
  website,
  phone,
  senderName,
  companyName,
  projectAddress,
  error,
  onButtonClick,
}: Props) => (
  <div className={`d-flex flex-column align-items-center ${classes.container}`}>
    <Icon className={`${classes.logo}`} type="logo" />
    {logo ? (
      <Avatar className={classes.logoCompany} avatar={logo} />
    ) : (
      <Icon className={classes.photoShareIcon} type={error ? 'photoshareerror' : 'photoshare'} />
    )}

    {!error && (
      <p className={classes.text}>
        <span className={classes.boldText}>{senderName}</span> from{' '}
        <span className={classes.boldText}>{companyName}</span> shared some photos with you from{' '}
        <span className={classes.boldText}>{projectAddress}</span> project!
      </p>
    )}

    {error && (
      <p className={classes.errorMessage}>
        Look like this link isn’t working anymore. Please ask the sender to send it again or try again later
      </p>
    )}

    {!error && (
      <PurpleButton className={classes.button} onClick={onButtonClick}>
        View Photos
      </PurpleButton>
    )}

    <div className={classes.companyInfo}>
      <div className={classes.website}>{website}</div>
      <div className={classes.phone}>{phone}</div>
    </div>
  </div>
);

const PhotoShareSplashViewMemo = memo(PhotoShareSplashView, areEqual);
export { PhotoShareSplashViewMemo as PhotoShareSplashView };
