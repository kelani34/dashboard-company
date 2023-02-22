/* eslint-disable */

export type NotesModel = {
  readonly id: number;
  body: string;
  created_at: string;
  updated_at: string;
  edited_at: string;
  is_flagged: boolean;
  is_bookmarked: boolean;

  /*
   * Relationships | include
   * */
  author: {
    full_name: string;
    first_name: string;
    last_name: string;
    user_is_author: boolean;
  };
  project: any[]; // Modal to be created
  category: any[]; // Modal to be created
};
