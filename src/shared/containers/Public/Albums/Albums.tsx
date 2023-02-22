import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Albums } from 'Components/Public';
import { useSelector } from 'react-redux';
import { photoShareInfoSelector } from 'Containers/Public/PhotoShare/selectors';

interface Props {
  roomId: string;
  photosCount: number;
}

const AlbumsContainer = ({ roomId, photosCount }: Props) => {
  const { albums } = useSelector(photoShareInfoSelector, areEqual);

  return photosCount && <Albums roomId={roomId} albums={albums} />;
};

const AlbumsContainerMemo = memo(AlbumsContainer, areEqual);

export { AlbumsContainerMemo as AlbumsContainer };
