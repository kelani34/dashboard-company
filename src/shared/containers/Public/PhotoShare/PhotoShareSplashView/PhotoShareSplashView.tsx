import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { areEqual } from 'Utils/equalityChecks';

import { PhotoShareSplashView } from 'Components/PhotoShareSplashView';

import { PhotoShareProvider } from 'Context/PhotoShare/PhotoShareProvider';
import { Spinner } from 'Components/Spinner';
import { formatPhoneNumberInternational } from 'Utils/helpers';
import { fetchingInfoSelector, photoShareErrorSelector, photoShareInfoSelector, uuidSelector } from '../selectors';

const PhotoShareSplashViewContainer = () => {
  const history = useHistory();

  const uuid = useSelector(uuidSelector);
  const { senderName, companyName, projectAddress, company } = useSelector(photoShareInfoSelector);
  const error = useSelector(photoShareErrorSelector, areEqual);
  const fetching = useSelector(fetchingInfoSelector, areEqual);

  const [companyLogo, setCompanyLogo] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');

  useEffect(() => {
    if (company?.id) {
      const { logo_url: logo, website, phones } = company;

      setCompanyLogo(logo);
      setCompanyWebsite(website);

      // get most recent phone number
      if (phones.length > 0) {
        const index = phones.length - 1;
        const { value } = phones[index];

        setCompanyPhone(formatPhoneNumberInternational(value));
      }
    }
  }, [company]);

  const onButtonClick = useCallback(() => {
    history.push(`/photo-share/${uuid}/view`);
  }, [uuid]);

  return (
    <PhotoShareProvider>
      {fetching && (
        <div className="d-flex w-100 mh-100">
          <Spinner loading />
        </div>
      )}
      {!fetching && (
        <PhotoShareSplashView
          logo={companyLogo}
          website={companyWebsite}
          phone={companyPhone}
          error={error}
          senderName={senderName}
          companyName={companyName}
          projectAddress={projectAddress}
          onButtonClick={onButtonClick}
        />
      )}
    </PhotoShareProvider>
  );
};

const PhotoShareSplashViewContainerMemo = memo(PhotoShareSplashViewContainer, areEqual);

export { PhotoShareSplashViewContainerMemo as PhotoShareSplashView };
