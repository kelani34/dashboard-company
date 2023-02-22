import React, { memo, useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';
import { InviteEmployees } from 'Components/InviteEmployees';
import { firstCompanyIdSelector } from 'Containers/Projects/selectors';
import { sendInviteSelector, emailInviteLinkSelector, emailErrorSelector } from './selectors';
import { sendInviteLink, setInviteSent, getInviteURL } from './actions';

interface Props {
  isOpen?: boolean;
  modalCloseClick: (e: any) => void;
  header?: any;
  footer?: any;
}

const InviteEmployeesContainer = ({ isOpen, modalCloseClick, header, footer }: Props) => {
  const dispatch = useDispatch();

  const sent = useSelector(sendInviteSelector, areEqual);
  const firstCompanyId = useSelector(firstCompanyIdSelector, areEqual);
  const emailLink = useSelector(emailInviteLinkSelector, areEqual);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [tempEmail, setTempEmail] = useState('');

  // email field is only cleared when email is sent and the modal is closed
  const [canClearEmail, setCanClearEmail] = useState(false);

  // API errors
  const errors = {
    email: useSelector(emailErrorSelector, areEqual),
  };

  useEffect(() => {
    dispatch(getInviteURL(firstCompanyId));
  }, []);

  useEffect(
    () => () => {
      if (sent) {
        setCanClearEmail(true);
        dispatch(setInviteSent(false));
      }
    },
    [sent]
  );

  useEffect(() => {
    if (!isOpen && canClearEmail) {
      setTempEmail('');
      setCanClearEmail(false);
    }
  }, [isOpen, canClearEmail]);

  const onCopyClick = useCallback((e: any) => {
    e.preventDefault();
    setToastMessage('Link Copied');
    setShowToast(true);
  }, []);

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
      dispatch(sendInviteLink(firstCompanyId, email));
      setToastMessage('Link Sent');
    },
    [email]
  );

  useEffect(() => {
    if (sent) {
      setTimeout(() => {
        dispatch(setInviteSent(false));
      }, 1500);
      setShowToast(true);
    }
  }, [sent]);

  // Toast timeout
  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 1500);
    }
  }, [showToast]);

  return (
    <div>
      <InviteEmployees
        header={header}
        footer={footer}
        emailLink={emailLink}
        inviteEmail={tempEmail}
        onEmailChange={onEmailChange}
        isButtonDisabled={isButtonDisabled}
        onCopyClick={onCopyClick}
        onFormSubmit={onFormSubmit}
        isOpen={isOpen}
        onSendClick={onSendClick}
        formErrors={errors}
        showToast={showToast}
        toastMessage={toastMessage}
        onClickCloseInviteEmployees={modalCloseClick}
      />
    </div>
  );
};

InviteEmployeesContainer.defaultProps = {
  isOpen: false,
  header: null,
  footer: null,
};

// This allows for default props if they exist
const InviteEmployeesContainerMemo = memo(InviteEmployeesContainer, areEqual);

export { InviteEmployeesContainerMemo as InviteEmployees };
