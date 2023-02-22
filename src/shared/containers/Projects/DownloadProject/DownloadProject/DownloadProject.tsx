import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';

import { setShowPhotoDownloadModal } from 'Containers/Projects/actions';

import { photoDownloadProjectSelector } from 'Containers/Projects/selectors';
import classes from './downloadProject.module.css';

interface Props {
  projectId: number;
}

const DownloadProjectContainer = ({ projectId }: Props) => {
  const dispatch = useDispatch();

  const photoDownloadProject = useSelector(photoDownloadProjectSelector, areEqual);

  // this is to open the modal, use a selector and pass the projectId, and reset the selector on modal cancel or close
  const onClickDownloadIcon = useCallback((e: any) => {
    e.preventDefault();
    dispatch(setShowPhotoDownloadModal(projectId));
  }, []);

  const defaultDownloadIcon = <Icon type="download" className={classes.downloadIcon} onClick={onClickDownloadIcon} />;

  const [downloadIcon, setDownloadIcon] = useState(defaultDownloadIcon);

  useEffect(() => {
    if (photoDownloadProject && photoDownloadProject === projectId) {
      setDownloadIcon(<Icon type="downloadpurple" className={classes.downloadIcon} />);
    } else {
      setDownloadIcon(defaultDownloadIcon);
    }
  }, [photoDownloadProject]);

  return downloadIcon;
};

const DownloadProjectContainerMemo = memo(DownloadProjectContainer, areEqual);

export { DownloadProjectContainerMemo as DownloadProjectContainer };
