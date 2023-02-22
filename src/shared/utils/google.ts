import Geocode from 'react-geocode';
import { AddressModal } from 'Containers/Projects/Modals';
import { parseNumber } from 'Utils/numbers';

Geocode.setApiKey(process.env.REACT_GOOGLE_API_KEY);

// Google autocomplete restrictions
export const componentRestrictions: any = { country: ['ca', 'us', 'aus', 'uk', 'nz'] };

// Get latitude or longitude from address.
export const getCoordinatesFromAddress = (address: AddressModal, setLat, setLng) => {
  const { address: addressOne, city, state, zip, country } = address;

  return Geocode.fromAddress(`${addressOne}, ${city}, ${state}, ${zip}, ${country}`)
    .then(({ results }: any) => {
      const [result] = results;
      const {
        geometry: {
          location: { lat, lng },
        },
      } = result;
      setLat(parseNumber(lat));
      setLng(parseNumber(lng));
    })
    .catch(() => null);
};
