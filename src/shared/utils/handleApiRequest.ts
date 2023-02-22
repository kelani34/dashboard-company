import { setFetching, setToaster, setFormErrors as setErrors } from 'Containers/Core/actions';
import { logout } from 'Containers/Auth';
import { createBrowserHistory } from 'history';
import { Api } from 'Utils/api';

const history = createBrowserHistory();

const {
  location: { pathname },
} = window;

const HTTP_ERROR_CODES = [401, 403, 404, 429, 500];

// to handle the async API calls,
// dispatch is mandatory
// apiRequest is mandatory
// types are optional and FORM_ERRORS are default for all the forms.
// you can send additional types for specific container to handle multiple API errors in a single form or multiple forms
export const handleApiRequest = async (
  dispatch,
  apiRequest,
  errorType = 'FORM_ERRORS',
  fetchingType = 'SET_FETCHING',
  setErrorsCallback = null
) => {
  // before make the api call set the loader, progress bars etc...
  dispatch(setFetching(true, fetchingType || 'SET_FETCHING'));

  // clear form errors for the type
  dispatch(setErrors(undefined, errorType || 'FORM_ERRORS'));
  if (setErrorsCallback) setErrorsCallback({});

  try {
    const { data } = await apiRequest;
    // turn of the loader, progress bars etc...
    dispatch(setFetching(false, fetchingType || 'SET_FETCHING'));

    // Destructure any object inside thunks
    return data;
  } catch (error: any) {
    // turn of the loader, progress bars etc...
    dispatch(setFetching(false, fetchingType || 'SET_FETCHING'));

    if (error?.response) {
      // Request made and server responded
      const {
        status,
        data: { message, errors },
      } = error.response;

      // set thunk based error objects
      // based on this conditionally show error messages
      if (HTTP_ERROR_CODES.includes(status) && message) {
        dispatch(setErrors(true, errorType || 'FORM_ERRORS'));
      }

      // show toast with the error message, need to add more use cases
      if (status === 403 && message) {
        dispatch(setToaster(message, false));
      }
      if (status === 500 && message) {
        dispatch(setToaster(message, false));
      }

      // set form errors for a given type from the thunk if the status code is 422
      if (status === 422 && (errors || message)) {
        dispatch(setErrors(errors || message, errorType || 'FORM_ERRORS'));
        if (setErrorsCallback) setErrorsCallback(errors);
      }

      // logout user if api returns 401 status
      if (status === 401 && message) {
        if (pathname.length > 1 && !pathname.includes('invite')) {
          dispatch(setToaster(message, false));
        }
        if (!pathname.includes('invite')) {
          dispatch(logout());
          await Api.csrfHeader();
          history.push('/');
        }
      }
    } else {
      dispatch(setToaster('Something went wrong, please try again or check back later!', false));
    }
    return null;
  }
};
