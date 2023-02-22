import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import GalleryPlaceholder from '../../../Assets/galleryplaceholder.svg';

interface Props {
  className?: string;
  id?: string;
}
const GalleryPlaceholderSvg = ({ className = '', id }: Props) => (
  <GalleryPlaceholder id={id} className={className || ''} />
);

GalleryPlaceholderSvg.defaultProps = {
  className: undefined,
  id: undefined,
};

const GalleryPlaceholderSvgMemo = memo(GalleryPlaceholderSvg, areEqualShallow);
export { GalleryPlaceholderSvgMemo as GalleryPlaceholderSvg };
