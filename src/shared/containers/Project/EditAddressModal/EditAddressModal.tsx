import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';

import {
  addressErrorSelector,
  cityErrorSelector,
  citySelector,
  countryErrorSelector,
  countrySelector,
  stateErrorSelector,
  stateSelector,
  streetAddressSelector,
  unitErrorSelector,
  unitSelector,
  zipErrorSelector,
  zipSelector,
} from 'Containers/Projects/selectors';

import { EditAddressModal } from 'Components/Project';
import { setAddressRequest, resetAddressRequest, addressUpdate } from 'Containers/Address/actions';
import { projectSelector } from 'Containers/RocketScan/selectors';

interface Props {
  isOpen: boolean;
  setIsOpen: (e: any) => void;
  onAddressUpdated: () => void;
}

const EditAddressModalContainer = ({ isOpen, setIsOpen, onAddressUpdated }: Props) => {
  const dispatch = useDispatch();

  const [fetching, setFetching] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [addressId, setAddressId] = useState(undefined);

  const project = useSelector(projectSelector, areEqual);

  const country = useSelector(countrySelector, areEqual);
  const state = useSelector(stateSelector, areEqual);
  const city = useSelector(citySelector, areEqual);
  const zip = useSelector(zipSelector, areEqual);
  const streetAddress = useSelector(streetAddressSelector, areEqual);
  const unit = useSelector(unitSelector, areEqual);

  // get project info on appearance
  useEffect(() => {
    if (isOpen && project?.address) {
      const { address } = project;
      setAddressId(address.id);

      dispatch(
        setAddressRequest({
          country: address.country,
          state: address.state,
          city: address.city,
          zip: address.zip,
          address: address.address,
          addressTwo: address.address_2,
        })
      );
    }
  }, [project, isOpen]);

  // API errors
  const errors = {
    country: useSelector(countryErrorSelector, areEqual),
    province: useSelector(stateErrorSelector, areEqual),
    city: useSelector(cityErrorSelector, areEqual),
    zip: useSelector(zipErrorSelector, areEqual),
    streetAddress: useSelector(addressErrorSelector, areEqual),
    unit: useSelector(unitErrorSelector, areEqual),
  };

  const closeModal = useCallback(() => {
    setFetching(false);
    dispatch(resetAddressRequest());
    setAddressId(undefined);
    setIsOpen(false);
  }, []);

  const onChangeCity = useCallback((e: any) => {
    const { value } = e.target;

    dispatch(setAddressRequest({ city: value }));
    setIsButtonEnabled(value.length === 0);
  }, []);

  const onChangeZip = useCallback((e: any) => {
    const { value } = e.target;

    dispatch(setAddressRequest({ zip: e.target.value }));
    setIsButtonEnabled(value.length === 0);
  }, []);

  const onChangeStreetAddress = useCallback((e: any) => {
    const { value } = e.target;

    dispatch(setAddressRequest({ address: value }));
    setIsButtonEnabled(value.length === 0);
  }, []);

  const onChangeUnit = useCallback((e: any) => {
    const { value } = e.target;

    dispatch(setAddressRequest({ addressTwo: value }));
  }, []);

  const onFinishUpdate = useCallback(() => {
    closeModal();
    onAddressUpdated();
  }, []);

  // set redux country variable on item select
  useEffect(() => {
    if (selectedCountry) {
      dispatch(setAddressRequest({ country: selectedCountry }));
      setIsButtonEnabled(selectedCountry.length === 0);
    }
  }, [selectedCountry]);

  // set redux state variable on item select
  useEffect(() => {
    if (selectedProvince) {
      dispatch(setAddressRequest({ state: selectedProvince }));
      setIsButtonEnabled(selectedProvince.length === 0);
    }
  }, [selectedProvince]);

  const onSaveClick = useCallback(
    (e: any) => {
      e.preventDefault();
      setFetching(true);
      if (addressId) {
        dispatch(
          addressUpdate(
            addressId,
            {
              country,
              state,
              city,
              zip,
              address: streetAddress,
              address_2: unit,
            },
            onFinishUpdate
          )
        );
      }
    },
    [addressId, country, state, city, zip, streetAddress, unit]
  );

  return (
    <EditAddressModal
      isOpen={isOpen}
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
      fetching={fetching}
      isButtonEnabled={isButtonEnabled}
      onCloseClick={closeModal}
      onSaveClick={onSaveClick}
    />
  );
};

const EditAddressModalContainerMemo = memo(EditAddressModalContainer, areEqual);

export { EditAddressModalContainerMemo as EditAddressModal };
