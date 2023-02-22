import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';

import { PhotoShare } from 'Components/PhotoShare';
import { Spinner } from 'Components/Spinner';
import { useHistory } from 'react-router-dom';
import { menuItemsSelector } from 'Containers/Public/PhotoShare/PhotoShareWrapper/SideBarMenu/selector';
import { photoShareInfoSelector, fetchingInfoSelector, photoShareErrorSelector, uuidSelector } from './selectors';

const PhotoShareContainer = () => {
  const history = useHistory();

  const { projectUid, shareTime, projectAddress, company } = useSelector(photoShareInfoSelector, areEqual);
  const uuid = useSelector(uuidSelector, areEqual);
  const fetching = useSelector(fetchingInfoSelector, areEqual);
  const error = useSelector(photoShareErrorSelector, areEqual);
  const items = useSelector(menuItemsSelector, areEqual);

  const [companyLogo, setCompanyLogo] = useState('');

  useEffect(() => {
    if (company?.id) {
      const { logo_url: logo } = company;
      setCompanyLogo(logo);
    }
  }, [company]);

  // if the API return errors, we'll redirect to the main screen to show error messages
  useEffect(() => {
    if (!fetching) {
      if (error) {
        history.push(`/photo-share/${uuid}`);
      }
    }
  }, [fetching, error]);

  return (
    <>
      {fetching && (
        <div className="d-flex w-100 mh-100">
          <Spinner loading />
        </div>
      )}
      {!fetching && (
        <PhotoShare
          location={projectAddress}
          projectUid={projectUid}
          logo={companyLogo}
          date={shareTime}
          items={items}
        />
      )}
    </>
  );
};

const PhotoShareContainerMemo = memo(PhotoShareContainer, areEqual);

export { PhotoShareContainerMemo as PhotoShare };
