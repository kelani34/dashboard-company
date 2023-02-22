import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';

import { EditAddress } from 'Components/Projects';
import { addressCreate, setAddressRequest } from 'Containers/Address/actions';
import { listProjectsStatuses } from 'Containers/Projects/actions';

import {
  addressErrorSelector,
  cityErrorSelector,
  citySelector,
  countryErrorSelector,
  countrySelector,
  firstCompanyIdSelector,
  latitudeSelector,
  longitudeSelector,
  placeIdSelector,
  projectStatusesSelector,
  stateErrorSelector,
  stateSelector,
  streetAddressSelector,
  unitErrorSelector,
  unitSelector,
  zipErrorSelector,
  zipSelector,
} from 'Containers/Projects/selectors';
import { coreFetchingSelector } from 'Containers/Core/selectors';

const EditAddressContainer = () => {
  const dispatch = useDispatch();

  // API data
  const projectStatuses = useSelector(projectStatusesSelector, areEqual);
  const firstCompanyId = useSelector(firstCompanyIdSelector, areEqual);

  // local variables
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');

  // we'll use redux based variables, because sometimes users may select an address from google autocomplete
  const placeId = useSelector(placeIdSelector, areEqual);
  const country = useSelector(countrySelector, areEqual);
  const state = useSelector(stateSelector, areEqual);
  const city = useSelector(citySelector, areEqual);
  const zip = useSelector(zipSelector, areEqual);
  const streetAddress = useSelector(streetAddressSelector, areEqual);
  const unit = useSelector(unitSelector, areEqual);
  const latitude = useSelector(latitudeSelector, areEqual);
  const longitude = useSelector(longitudeSelector, areEqual);

  // API request timer

  // API errors
  const errors = {
    country: useSelector(countryErrorSelector, areEqual),
    province: useSelector(stateErrorSelector, areEqual),
    city: useSelector(cityErrorSelector, areEqual),
    zip: useSelector(zipErrorSelector, areEqual),
    streetAddress: useSelector(addressErrorSelector, areEqual),
    unit: useSelector(unitErrorSelector, areEqual),
  };

  useEffect(() => {
    dispatch(listProjectsStatuses());
  }, []);

  useEffect(() => {}, [placeId]);

  // set redux country variable on item select
  useEffect(() => {
    if (selectedCountry) {
      dispatch(setAddressRequest({ country: selectedCountry }));
    }
  }, [selectedCountry]);

  // set redux state variable on item select
  useEffect(() => {
    if (selectedProvince) {
      dispatch(setAddressRequest({ state: selectedProvince }));
    }
  }, [selectedProvince]);

  const onChangeCity = useCallback((e: any) => {
    const { value } = e.target;

    dispatch(setAddressRequest({ city: value }));
  }, []);

  const onChangeZip = useCallback((e: any) => {
    const { value } = e.target;

    dispatch(setAddressRequest({ zip: e.target.value }));
  }, []);

  const onChangeStreetAddress = useCallback((e: any) => {
    const { value } = e.target;

    dispatch(setAddressRequest({ address: value }));
  }, []);

  const onChangeUnit = useCallback((e: any) => {
    const { value } = e.target;

    dispatch(setAddressRequest({ addressTwo: value }));
  }, []);

  const onFormButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();
      const projectStatusId = projectStatuses?.data?.length
        ? projectStatuses.data.find((status: any) => status.name === 'wip')?.id
        : '';

      if (firstCompanyId && projectStatusId) {
        dispatch(
          addressCreate(
            {
              google_places_id: placeId,
              country,
              state,
              city,
              zip,
              address: streetAddress,
              address_2: unit,
              latitude: latitude.toString(),
              longitude: longitude.toString(),
            },
            firstCompanyId,
            projectStatusId
          )
        );
      }
    },
    [firstCompanyId, projectStatuses, placeId, country, state, city, zip, streetAddress, unit]
  );

  return (
    <EditAddress
      country={country}
      state={state}
      city={city}
      zip={zip}
      streetAddress={streetAddress}
      unit={unit}
      onChangeCity={onChangeCity}
      onChangeZip={onChangeZip}
      onChangeStreetAddress={onChangeStreetAddress}
      onChangeUnit={onChangeUnit}
      formErrors={errors}
      setSelectedCountry={setSelectedCountry}
      setSelectedProvince={setSelectedProvince}
      onFormButtonClick={onFormButtonClick}
    />
  );
};

const EditAddressContainerMemo = memo(EditAddressContainer, areEqual);

export { EditAddressContainerMemo as EditAddressContainer };
