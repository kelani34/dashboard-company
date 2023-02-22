import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';
import { validateImageFileType, validateImageResolution } from 'Utils/helpers';
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';
import { useUser } from 'Context/User';
import { UserModel } from 'Containers/User/Models/UserModel';
import { setAvatarUploading, resetAvatarUploading, userDetails } from 'Containers/User/actions';
import { setLogoUploading, resetLogoUploading } from 'Containers/Company/actions';
import { companyLogoUploading } from 'Containers/Company/selectors';
import { userAvatarUploading } from 'Containers/User/selector';

import { UploadAvatar } from 'Components/Profiles/Account';

interface Props {
  profile: string;
}

const createWorker = createWorkerFactory(() => import('Containers/User/worker'));

const UploadAvatarContainer = ({ profile }: Props) => {
  const dispatch = useDispatch();

  const avatarFetching = useSelector(userAvatarUploading, areEqual);
  const logoFetching = useSelector(companyLogoUploading, areEqual);

  const avatarWorker = useWorker(createWorker);
  const user: UserModel = useUser();
  const hiddenFileInput = React.useRef(null);

  const [selectedFileName, setSelectedFileName] = useState('');
  const [fileSelectError, setFileSelectError] = useState('');

  const onClickUpload = useCallback((e: any) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  }, []);

  const setUploading = useCallback(() => {
    if (profile === 'user') {
      dispatch(setAvatarUploading(true));
    } else {
      dispatch(setLogoUploading(true));
    }
  }, []);

  // reset spinners and refresh photo
  const resetFetching = useCallback(() => {
    setTimeout(() => {
      if (profile === 'user') {
        dispatch(resetAvatarUploading(false));
      } else {
        dispatch(resetLogoUploading(false));
      }
      dispatch(userDetails());
    }, 2000);
  }, []);

  const onUploadChange = useCallback(async (e: any) => {
    const acceptedFiles = e.target.files;
    const [file] = acceptedFiles;
    const image = new Image();
    const fr = new FileReader();

    // Get User and Company Id
    const { id: userId, companies } = user;
    const [company] = companies;
    const { id: companyId } = company;

    if (file) {
      // Pass to worker depending on if it's for User or Company profiles
      const fields =
        profile === 'user'
          ? { user_id: userId }
          : {
              user_id: userId,
              company_id: companyId,
            };
      const templateId =
        profile === 'user'
          ? process.env.REACT_TRANSLOADIT_AVATAR_TEMPLATE_ID
          : process.env.REACT_TRANSLOADIT_LOGO_TEMPLATE_ID;

      setSelectedFileName(file.name);

      fr.onload = () => {
        if (fr !== null && typeof fr.result === 'string') {
          image.src = fr.result;
        }
      };
      fr.readAsDataURL(file);

      // Upload image if valid
      image.onload = async () => {
        // If image resolution is less than 4000x4000px and image is .png or .jpeg then upload logo
        if (validateImageResolution(image.width, image.height) && validateImageFileType(file)) {
          setFileSelectError('');
          await avatarWorker.logoUpload(fields, templateId, [file], setUploading, resetFetching);
        }
        // If image resolution is greater than 4000x4000px then display error message
        else if (!validateImageResolution(image.width, image.height)) {
          setSelectedFileName('');
          setFileSelectError('Selected file is over 4000x4000px');
        }
        // If image type isn't .png or .jpeg then display error message
        else if (!validateImageFileType(file)) {
          setSelectedFileName('');
          setFileSelectError('Selected file type is not .png or .jpeg');
        }
        // If any other scenario, display generic message
        else {
          setSelectedFileName('');
          setFileSelectError('Something went wrong, please try again');
        }
      };
    }
  }, []);

  return (
    <UploadAvatar
      profile={profile}
      selectedFileName={selectedFileName}
      hiddenFileInput={hiddenFileInput}
      fileSelectError={fileSelectError}
      fetching={avatarFetching || logoFetching}
      onClickUpload={onClickUpload}
      onUploadChange={onUploadChange}
    />
  );
};

const UploadAvatarContainerMemo = memo(UploadAvatarContainer, areEqual);

export { UploadAvatarContainerMemo as UploadAvatarContainer };
