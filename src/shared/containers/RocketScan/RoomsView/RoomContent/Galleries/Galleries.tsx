import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useSelector } from 'react-redux';
import { albumTypesSelector, selectedCategoriesSelector } from 'Containers/RocketScan/selectors';
import { Gallery } from 'Containers/RocketScan';
import { checkGalleryEnabled, galleryShouldShow } from 'Utils/helpers';

interface Props {
  roomId: number;
  editable: boolean;
  photoAlbums: any;
  setAlbumPhotos: (e: any) => void;
}

const GalleriesContainer = ({ roomId, editable, photoAlbums, setAlbumPhotos }: Props) => {
  const albumTypes = useSelector(albumTypesSelector, areEqual);
  const selectedCategories = useSelector(selectedCategoriesSelector);

  return (
    <>
      {albumTypes.map(({ id, name }: any) => (
        <Gallery
          key={`${roomId}-${id}`}
          roomId={roomId}
          albumId={id}
          title={name}
          editable={editable}
          hide={!galleryShouldShow(id, selectedCategories, checkGalleryEnabled(id, photoAlbums), editable)}
          setAlbumPhotos={setAlbumPhotos}
        />
      ))}
    </>
  );
};

const GalleriesContainerMemo = memo(GalleriesContainer, areEqual);

export { GalleriesContainerMemo as GalleriesContainer };
