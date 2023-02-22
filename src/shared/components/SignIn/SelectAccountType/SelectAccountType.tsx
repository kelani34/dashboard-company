import React, { memo } from 'react';
import { Icon } from 'Components/Icons';

import { areEqual } from 'Utils/equalityChecks';

import { Button } from 'Components/Button';
import { SignInWrapper } from '../SignInWrapper';
import classes from './selectAccountType.module.css';

interface Props {
  onClickCreate?: (e: any) => void;
  onClickJoin?: (e: any) => void;
}

const SelectAccountType = ({ onClickCreate, onClickJoin }: Props) => (
  <SignInWrapper title="Select Account Type">
    <div className="col-sm-12 col-md-6 col-lg-6 offset-md-3 offset-lg-3 d-flex flex-column align-items-center">
      <p className={classes.description}>
        Start managing your company with Company or join your company working with Company.
      </p>
      <Button
        id="CreateCompany_Button"
        className={`d-flex w-100 align-items-center justify-content-between ${classes.selectButtons} ${classes.create}`}
        onClick={onClickCreate}
      >
        <span className={classes.buttonContentLeft}>
          <Icon type="officebuilding" className={classes.buttonIcon} />
          <div className={classes.buttonContent}>
            <span className={classes.textContent}>Create a Company</span>
            <span className={classes.buttonDescription}>To create projects and invite employees</span>
          </div>
        </span>
        <span className={classes.buttonContentRight}>
          <Icon type="dropdownarrow" className={classes.rightArrow} />
        </span>
      </Button>
      <Button
        className={`d-flex w-100 align-items-center justify-content-between  ${classes.selectButtons} ${classes.join}`}
        onClick={onClickJoin}
      >
        <span className={classes.buttonContentLeft}>
          <Icon type="peoplepink" className={classes.buttonIcon} />
          <div className={classes.buttonContent}>
            <span className={classes.textContent}>Join an existing Company</span>
            <span className={classes.buttonDescription}>For company and crew members</span>
          </div>
        </span>
        <span className={classes.buttonContentRight}>
          <Icon type="dropdownarrow" className={classes.rightArrow} />
        </span>
      </Button>
    </div>
  </SignInWrapper>
);

SelectAccountType.defaultProps = {
  onClickCreate: undefined,
  onClickJoin: undefined,
};

const SelectAccountTypeMemo = memo(SelectAccountType, areEqual);

export { SelectAccountTypeMemo as SelectAccountType };
