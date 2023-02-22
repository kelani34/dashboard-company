/* eslint-disable */

import { UserModel } from 'Containers/User/Models/UserModel';

export type CompanyProjectsDataModal = {
  data: Array<CompanyProjectsModal>;
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

export type CompanyProjectsModal = {
  readonly id: number;
  uid: string;
  alias?: string;
  company?: CompanyModal;
  address: AddressModal;
  creator?: UserModel;
  project_status: ProjectStatusesModal;
  created_at: string;
  photos_count?: number;
  units_count?: number;
  floors_count?: number;
};

export type CompanyModal = {
  readonly id: number;
  address_id: number;
  logo_url: string;
  address: string;
  parent_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  country_alpha_2: string;
  country_code: string;

  /*
   * optional
   * */

  code?: string;
  prefix?: string;
  logo?: string;
  website?: string;
  approved_at?: string;
  deleted_at?: string;
};

export type AddressModal = {
  readonly id: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;

  /*
   * optional
   * */

  address_2?: string;
  latitude?: string;
  longitude?: string;
};

export type ProjectStatusesModal = {
  readonly id: number;
  name: string;
};

type MetaLinks = {
  url: string | null;
  label: string;
  active: boolean;
};
