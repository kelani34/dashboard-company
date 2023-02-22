/* eslint-disable */

import { ProvinceModel } from 'Containers/Address/ProvinceAutocomplete/Models/ProvinceModel';

export type CountryModel = {
  id: number;
  name: string;
  alpha_2: string;
  alpha_3: string;
  provinces: Array<ProvinceModel>;
};
