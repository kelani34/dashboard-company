import React, { memo, useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { areEqual } from 'Utils/equalityChecks';

import { setAddressRequest } from 'Containers/Address/actions';

import { GoogleAutocomplete } from 'Components/Address';

import { componentRestrictions } from 'Utils/google';

const googleAutoCompleteConfig = {
  debounce: 700,
};

const GoogleAutocompleteContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { placesService, placePredictions, getPlacePredictions } = usePlacesService(googleAutoCompleteConfig);

  // local variables
  const [address, setAddress]: any = useState('');
  const [showDropDown, setShowDropDown]: any = useState(false);
  const [placeDetails, setPlacesDetails]: any = useState('');
  const [localPlacePredictions, setLocalPlacePredictions]: any = useState([]);
  const [placeId, setPlaceId]: any = useState('');

  // we'll use these objects to get accurate data from the google
  const [autocompleteAddress, setAutocompleteAddress] = useState({
    street_number: '',
    route: '',
    locality: '',
    administrative_area_level_1: '',
    country: '',
    postal_code: '',
  });
  const [addressComponents] = useState({
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'long_name',
    country: 'short_name',
    postal_code: 'short_name',
  });

  useEffect(() => {
    // prepare the local data object, add or modify any property as needed
    if (placePredictions.length) {
      setLocalPlacePredictions(
        placePredictions.map((place: any) => ({
          placeId: place.place_id,
          mainText: place?.structured_formatting?.main_text,
          secondaryText: place?.structured_formatting?.secondary_text,
        }))
      );
    }
  }, [placePredictions]);

  useEffect(() => {
    // show the dropdown once the data is prepared
    setShowDropDown(localPlacePredictions.length > 0);
  }, [localPlacePredictions]);

  // on set placeId, we'll call google API to get place details
  useEffect(() => {
    if (placeId) {
      placesService?.getDetails({ placeId }, (placeDetails) => {
        setPlacesDetails(placeDetails);
      });
    }
  }, [placeId]);

  // this is where we set our local variables, redux variables
  useEffect(() => {
    if (placeDetails) {
      setAddress(placeDetails?.formatted_address);

      const address: any = {};
      const components: any = placeDetails?.address_components || [];

      components.forEach((component: any) => {
        const [addressType = ''] = component?.types;

        if (addressType.length > 0) {
          if (addressComponents[addressType]) {
            // set address objects with google data
            address[addressType] = addressType.length > 0 ? component[addressComponents[addressType]] : '';
          }
        }
      });

      // update state
      setAutocompleteAddress({
        ...autocompleteAddress,
        ...address,
      });
    }
  }, [placeDetails]);

  // here we'll update the redux and trigger the route change
  useEffect(() => {
    if (autocompleteAddress.country) {
      dispatch(
        setAddressRequest({
          google_places_id: placeId,
          country: autocompleteAddress.country,
          state: autocompleteAddress.administrative_area_level_1,
          city: autocompleteAddress.locality,
          zip: autocompleteAddress.postal_code,
          address: `${autocompleteAddress.street_number} ${autocompleteAddress.route}`,
          latitude: placeDetails?.geometry?.location?.lat(),
          longitude: placeDetails?.geometry?.location?.lng(),
        })
      );

      setShowDropDown(false);
      history.push('/projects/editAddress');
    }
  }, [autocompleteAddress]);

  const onChangeAddress = useCallback((e: any) => {
    const { value } = e.target;

    // this will call the google API and get the predictions
    getPlacePredictions({ input: value, componentRestrictions });

    // to set local input value
    setAddress(value);
  }, []);

  const onSelectItem = useCallback(
    (e: any) => {
      // set placeId
      const tempPlaceId = e.target.dataset?.id;
      if (tempPlaceId) {
        setPlaceId(tempPlaceId);
      } else {
        // sometimes id not present in the target element, so we'll get the id from the parent(Anchor) tag
        // this happen when they click on the Span tag
        setPlaceId(e.target.parentElement.dataset.id);
      }

      // close the dropdown
      setShowDropDown(false);
    },
    [localPlacePredictions]
  );

  // close the dropdown when click outside the dropdown
  const onblur = useCallback(() => {
    setShowDropDown(false);
  }, []);

  return (
    <GoogleAutocomplete
      address={address}
      onChangeAddress={onChangeAddress}
      placePredictions={localPlacePredictions}
      onSelectItem={onSelectItem}
      showDropDown={showDropDown}
      onblur={onblur}
    />
  );
};

const GoogleAutocompleteContainerMemo = memo(GoogleAutocompleteContainer, areEqual);

export { GoogleAutocompleteContainerMemo as GoogleAutocompleteContainer };
