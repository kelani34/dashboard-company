import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';

import { listCountries, setProvincesList } from 'Containers/Address/actions';
import { CountryModel } from 'Containers/Address/CountryAutocomplete/Models/CountryModel';

import { CountryAutocomplete } from 'Components/Address';

// set country value if passed from the parent (redux variable)
const getCountryLongName = (countriesList: Array<CountryModel>, value: string) =>
  countriesList.find((country: CountryModel) => country.alpha_2.toLocaleLowerCase() === value.toLocaleLowerCase());

const countriesSelector = ({ address: { countries } }: any) => countries;

interface Props {
  country: string;
  setSelectedCountry: (e: any) => void;
  invalid?: boolean;
  showCaretIcon?: boolean;
}

const CountryAutocompleteContainer = ({ country, setSelectedCountry, invalid, showCaretIcon }: Props) => {
  const dispatch = useDispatch();

  const [countryLocal, setCountryLocal] = useState('');
  const [countries, setCountries] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);

  // API data
  const countriesList: Array<CountryModel> = useSelector(countriesSelector, areEqual);
  useEffect(() => {
    if (countriesList.length === 0) {
      dispatch(listCountries());
    }
  }, []);

  // we'll use this to prevent the if condition being running onSelectItem useCallback
  const [clear, setClear] = useState(true);
  useEffect(() => {
    // if the country field sent, we'll set the local country state and provinces
    // this happen when a user choose an address from google
    if (country && countriesList.length > 0 && clear) {
      let provinces = [];
      const lowercase = country.toLocaleLowerCase();

      // if the country selected from google autocomplete we do the following
      if (country.length <= 3) {
        setCountryLocal(getCountryLongName(countriesList, country)?.name);

        const { provinces: provinceList } = countriesList.find(
          (country: CountryModel) => country.alpha_2.toLocaleLowerCase() === lowercase
        );

        provinces = provinceList;
      } else {
        setCountryLocal(country);

        provinces = countriesList.find(
          (country: CountryModel) => country.name.toLocaleLowerCase() === lowercase
        )?.provinces;
      }

      if (provinces) {
        dispatch(setProvincesList(provinces));
      }
    }
  }, [country, countriesList]);

  useEffect(() => {
    if (countriesList.length > 0) {
      setCountries(countriesList);
    }
  }, [countriesList]);

  const onChangeCountry = useCallback(
    (e: any) => {
      e.preventDefault();

      setClear(false);
      const { value } = e.target;

      if (value.length > 0) {
        const lowercase = value.toLocaleLowerCase();
        const countries = countriesList.filter((country: CountryModel) =>
          country.name.toLocaleLowerCase().includes(lowercase)
        );
        setCountries(countries);
        setShowDropDown(countries.length > 0);
      } else {
        dispatch(setProvincesList([]));
      }
      setSelectedCountry(value);
      setCountryLocal(value);
    },
    [countriesList]
  );

  const onSelectItem = useCallback(
    (e: any) => {
      e.preventDefault();

      const { id = '', name = '' } = e.target.dataset;

      setCountryLocal(name);
      setSelectedCountry(name);

      const { provinces } = countriesList.find((country: CountryModel) => country.id.toString() === id);

      if (provinces) {
        dispatch(setProvincesList(provinces));
      }

      setShowDropDown(false);

      // set this to false, so the if condition in the first useEffect will fail
      setClear(false);
    },
    [countriesList]
  );

  const onClickCaretIcon = useCallback(() => {
    setShowDropDown((prevState) => !prevState);
  }, []);

  // we'll close the dropdown onBlur event outside the dropdown
  // const onBlur = useCallback((e: any) => {
  //   e.preventDefault();
  //   setShowDropDown(false);
  // }, []);

  return (
    <CountryAutocomplete
      country={countryLocal}
      onChangeCountry={onChangeCountry}
      countries={countries}
      onSelectItem={onSelectItem}
      onClickCaretIcon={onClickCaretIcon}
      showCaretIcon={showCaretIcon}
      showDropDown={showDropDown}
      invalid={invalid}
    />
  );
};

CountryAutocompleteContainer.defaultProps = {
  invalid: false,
  showCaretIcon: false,
};

const CountryAutocompleteContainerMemo = memo(CountryAutocompleteContainer, areEqual);

export { CountryAutocompleteContainerMemo as CountryAutocompleteContainer };
