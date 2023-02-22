import React, { memo, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';

import { PhotoShareLink } from 'Components/RocketScan';
import {
  emailErrorSelector,
  photoShareLinkSelector,
  photoShareSelector,
  sendPhotoShareSelector,
} from 'Containers/RocketScan/Header/ActionsCenter/selectors';

import { sendPhotoShareLink, setPhotoShareSent } from 'Containers/RocketScan/Header/ActionsCenter/actions';

interface Props {
  toastMessage: any;
  showToast: any;
}

const PhotoShareLinkContainer = ({ toastMessage, showToast }: Props) => {
  const dispatch = useDispatch();

  const photoShareLink = useSelector(photoShareLinkSelector, areEqual);
  const photoShare = useSelector(photoShareSelector, areEqual);
  const sent = useSelector(sendPhotoShareSelector, areEqual);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [tempEmail, setTempEmail] = useState('');
  const [email, setEmail] = useState('');
  const [photoShareURL, setPhotoShareURL] = useState('');
  const [photoShareId, setPhotoShareId] = useState('');

  // API errors
  const errors = {
    email: useSelector(emailErrorSelector, areEqual),
  };

  useEffect(() => {
    if (photoShare?.id) {
      const { short_url: shortUrl, id } = photoShare;
      setPhotoShareURL(shortUrl);
      setPhotoShareId(id);
    }
  }, [photoShareLink, photoShare]);

  useEffect(() => {
    if (sent) {
      setTimeout(() => {
        dispatch(setPhotoShareSent(false));
      }, 1500);
      showToast(true);
      setTempEmail('');
      setIsButtonDisabled(true);
    }
  }, [sent]);

  const onCopyClick = useCallback(
    (e: any) => {
      e.preventDefault();
      toastMessage('Link Copied');
      showToast(true);
    },
    [showToast, toastMessage]
  );

  const onEmailChange = useCallback((e: any) => {
    const { value } = e.target;
    setIsButtonDisabled(value.length === 0);
    setTempEmail(value);
  }, []);

  const onFormSubmit = useCallback((formData: any) => {
    const { email } = formData;
    setEmail(email);
  }, []);

  const onSendClick = useCallback(
    (e: any) => {
      e.preventDefault();
      dispatch(
        sendPhotoShareLink(photoShareId, {
          email,
        })
      );
      toastMessage('Link to photos has been sent');
    },
    [photoShareId, email, toastMessage]
  );

  return (
    <PhotoShareLink
      photosLink={photoShareURL}
      inviteEmail={tempEmail}
      isButtonDisabled={isButtonDisabled}
      formErrors={errors}
      onCopyClick={onCopyClick}
      onEmailChange={onEmailChange}
      onFormSubmit={onFormSubmit}
      onSendClick={onSendClick}
    />
  );
};

const PhotoShareLinkContainerMemo = memo(PhotoShareLinkContainer, areEqual);

export { PhotoShareLinkContainerMemo as PhotoShareLinkContainer };
