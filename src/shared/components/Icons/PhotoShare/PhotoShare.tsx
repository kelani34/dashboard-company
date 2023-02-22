import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import PhotoShare from '../../../Assets/photo-share.svg';
import PhotoShareError from '../../../Assets/photo-share-error.svg';

interface Props {
  className?: string;
  id?: string;
  iconType?: string;
}

const PhotoShareSvg = ({ className = '', id, iconType }: Props) => {
  switch (iconType) {
    case 'photoshareerror':
      return <PhotoShareError id={id} className={className || ''} />;

    default:
      return <PhotoShare id={id} className={className || ''} />;
  }
};

PhotoShareSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: 'photoshare',
};

const PhotoShareSvgMemo = memo(PhotoShareSvg, areEqualShallow);
export { PhotoShareSvgMemo as PhotoShareSvg };
