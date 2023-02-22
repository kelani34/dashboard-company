/* eslint-disable */

export type UserPhonesModel = {
  data: Array<UserPhonesData>;
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<UserPhonesLinks>;
    path: string;
    per_page: string;
    to: number;
    total: number;
  };
};

export type UserPhonesData = {
  id: number;
  value: string;
  is_primary: boolean;
  extension: string;
  type: string;
  country_code: string;
  country_alpha_2: string;
};

type UserPhonesLinks = {
  url: string | null;
  label: string;
  active: boolean;
};
