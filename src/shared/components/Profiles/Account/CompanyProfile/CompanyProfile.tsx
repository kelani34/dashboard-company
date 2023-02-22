import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { CompanyInfoCard } from 'Containers/User/Account/CompanyProfile/CompanyInfoCard';
import { DarkPurpleButton, PurpleButton } from 'Components/Button';
import { AvatarOrInitials } from 'Components/Avatar';
import { EditCompanyInfo } from './EditCompanyInfo';

import classes from './companyProfile.module.css';

interface Props {
  companyAvatar: any;
  companyName: string;
  companyPhone: string;
  companyWebsite: string;
  companyAddress: string;
  companyEditable: boolean;
  companyAddressSecond: string;
  companyCountry: string;
  companyState: string;
  companyCity: string;
  companyZip: string;
  formErrors: any;
  countryId: number;
  countryCode: any;
  countryFlag: string;
  isCompanyAdmin: boolean;
  onEditCompanyClick: (e: any) => void;
  onFormSubmit: (e: any) => void;
  onCancelClick: (e: any) => void;
  onChangeCompanyName: (e: any) => void;
  onChangeCompanyPhone: (e: any) => void;
  onChangeCompanyWebsite: (e: any) => void;
  onChangeCompanyAddress: (e: any) => void;
  onChangeCompanyAddressSecond: (e: any) => void;
  setSelectedCountry: (e: any) => void;
  setSelectedProvince: (e: any) => void;
  onChangeCompanyCity: (e: any) => void;
  onChangeCompanyZip: (e: any) => void;
}

const CompanyProfile = ({
  companyAvatar,
  companyName,
  companyPhone,
  companyWebsite,
  companyAddress,
  companyAddressSecond,
  companyCountry,
  companyState,
  companyCity,
  companyZip,
  formErrors,
  countryId,
  countryCode,
  countryFlag,
  isCompanyAdmin,
  companyEditable,
  onEditCompanyClick,
  onFormSubmit,
  onCancelClick,
  onChangeCompanyName,
  onChangeCompanyPhone,
  onChangeCompanyWebsite,
  onChangeCompanyAddress,
  onChangeCompanyAddressSecond,
  setSelectedCountry,
  setSelectedProvince,
  onChangeCompanyCity,
  onChangeCompanyZip,
}: Props) => (
  <div>
    <form className={classes.container}>
      {!companyEditable ? (
        <DarkPurpleButton
          className={isCompanyAdmin ? classes.editButton : 'd-none'}
          onClick={onEditCompanyClick}
          type="button"
        >
          Edit
        </DarkPurpleButton>
      ) : (
        <div className={classes.buttons}>
          <PurpleButton className={classes.saveButton} onClick={onFormSubmit} type="submit">
            Save Changes
          </PurpleButton>
          <span>
            <DarkPurpleButton className={classes.cancelButton} onClick={onCancelClick} type="button">
              Cancel
            </DarkPurpleButton>
          </span>
        </div>
      )}
      <h2 className={classes.header}>Company Account</h2>
      <div className={classes.components}>
        <div className={classes.editForm}>
          <div className={classes.avatarContainer}>
            <AvatarOrInitials
              avatarClassName={companyAvatar ? classes.avatar : classes.initials}
              avatar={companyAvatar}
              firstName={companyName}
              lastName={null}
            />
          </div>
          {!companyEditable ? (
            <CompanyInfoCard />
          ) : (
            <div className={classes.editContainer}>
              <EditCompanyInfo
                companyName={companyName}
                companyPhone={companyPhone}
                companyWebsite={companyWebsite}
                companyAddress={companyAddress}
                companyAddressSecond={companyAddressSecond}
                companyCountry={companyCountry}
                companyState={companyState}
                companyCity={companyCity}
                companyZip={companyZip}
                formErrors={formErrors}
                countryCode={countryCode}
                countryId={countryId}
                countryFlag={countryFlag}
                onChangeCompanyName={onChangeCompanyName}
                onChangeCompanyPhone={onChangeCompanyPhone}
                onChangeCompanyWebsite={onChangeCompanyWebsite}
                onChangeCompanyAddress={onChangeCompanyAddress}
                onChangeCompanyAddressSecond={onChangeCompanyAddressSecond}
                setSelectedCountry={setSelectedCountry}
                setSelectedProvince={setSelectedProvince}
                onChangeCompanyCity={onChangeCompanyCity}
                onChangeCompanyZip={onChangeCompanyZip}
              />
            </div>
          )}
        </div>
        {companyEditable ? (
          <div className={classes.buttonsBottom}>
            <PurpleButton className={classes.saveButton} onClick={onFormSubmit} type="submit">
              Save Changes
            </PurpleButton>
            <span>
              <DarkPurpleButton className={classes.cancelButton} onClick={onCancelClick} type="button">
                Cancel
              </DarkPurpleButton>
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
    </form>
  </div>
);

const CompanyProfileMemo = memo(CompanyProfile, areEqual);

export { CompanyProfileMemo as CompanyProfile };
