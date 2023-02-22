/* eslint-disable */

export type UserCompaniesModel = {
  data: Array<Data>;
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
    links: Array<MetaLinks>;
    path: string;
    per_page: string;
    to: number;
    total: number;
  };
};

type Data = {
  id: number;
  parent_id: number;
  address_id: number;
  name: string;
  code: string;
  prefix: string;
  logo: string;
  website: string;
  approved_at: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};

type MetaLinks = {
  url: string | null;
  label: string;
  active: boolean;
};
