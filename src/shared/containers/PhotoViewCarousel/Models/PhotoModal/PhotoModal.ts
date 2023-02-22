/* eslint-disable */

export type PhotoModal = {
  readonly id: number;
  uuid: string;
  is_ir: boolean;
  s3_key: string;
  bucket: string;
  file_name: string;
  file_extension: string;
  content_type: string;
  sizes: {
    small: string;
    medium: string;
    large: string;
    gallery: string;
    raw: string;
  };
  created_at: string;
  creator: {
    id: number;
    first_name: string;
    full_name: string;
    last_name: string;
  };
  updated_at: string;
  photo: IrPhotoModal;
  photoable: {
    // photoable means room
    id: number;
    is_source: boolean;
    sort_order: number;
    level: {
      readonly id: number;
      name: string;
      is_default: boolean;
    };
    room_type: {
      readonly id: number;
      name: string;
      type: string;
    };
    morphable: {
      // morphable means unit or floor
      readonly id: number;
      name: string;
    };
  };
  notes: Array<[]>;
  notes_count: number;
  albums: Array<AlbumModal>;
  is_bookmarked: boolean;
  is_flagged: boolean;
};

type IrPhotoModal = {
  readonly id: number;
  uuid: string;
  is_ir: boolean;
  s3_key: string;
  bucket: string;
  file_name: string;
  file_extension: string;
  content_type: string;
  sizes: {
    small: string;
    medium: string;
    large: string;
    gallery: string;
    raw: string;
  };
  created_at: string;
  updated_at: string;
};

export type AlbumModal = {
  readonly id: number;
  name: string;
};
