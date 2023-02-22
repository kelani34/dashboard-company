/* eslint-disable */

import { SET_AUTHENTICATED, SET_AUTHENTICATION_TYPE, SOCIAL_LOGIN_ERRORS } from 'Containers/Auth/actions';
import { SET_FETCHING } from 'Containers/Core/actions';
import { height, width } from 'Utils/screen';
import { userDetails } from 'Containers/User';

// popup window global settings
// feel free to modify this
const windowFeatures = `toolbar=no, menubar=no, width=${width}, height=${height}`;

// Oauth2 will handle the social media login for all the available providers. Currently working providers are 'google', 'facebook', 'apple'
export const Oauth2 =
  (provider: string) =>
  (dispatch: any, _getState = null, _utils: any) => {
    provider = provider.toLocaleLowerCase();

    // popup window parameters
    const URL = `${process.env.REACT_APP_BASE_URL}oauth2/redirect/${provider}`;
    const windowName = `${provider}Window`;

    // popup window variables
    let windowObjectReference = null;
    let previousUrl = null;

    // handle window event listener
    const receiveMessage = (event: any) => {
      const { status } = event.data;

      // update redux on successful login
      if (status === 200) {
        // important to call this function whenever user authenticates successfully
        dispatch(userDetails());

        // set progress bars, loaders
        dispatch({
          type: SET_FETCHING,
          payload: true,
        });

        // reset error messages
        dispatch({
          type: SOCIAL_LOGIN_ERRORS,
          payload: {
            error: false,
            message: '',
          },
        });

        // we'll close the window
        windowObjectReference.close();

        // timeout is optional --this will take it time to show the progress bars, loaders etc...
        setTimeout(() => {
          // set app authentication state
          dispatch({
            type: SET_AUTHENTICATED,
            payload: true,
          });

          // set app authentication type
          dispatch({
            type: SET_AUTHENTICATION_TYPE,
            payload: 'social',
          });

          // set progress bars, loaders
          dispatch({
            type: SET_FETCHING,
            payload: false,
          });
        }, 1000);
      }

      // handle any errors on unsuccessful login
      if (status === 500) {
        const { message } = event.data?.body;

        // we'll close the window
        windowObjectReference.close();

        // set errors
        dispatch({
          type: SOCIAL_LOGIN_ERRORS,
          payload: {
            errors: true,
            message: message,
          },
        });

        // disable progress bars, loaders
        dispatch({
          type: SET_FETCHING,
          payload: false,
        });
      }
    };

    // window functions
    const openSignInWindow = (url, name) => {
      // remove any existing event listeners
      window.removeEventListener('message', receiveMessage);

      if (windowObjectReference === null || windowObjectReference.closed) {
        /* if the pointer to the window object in memory does not exist
                       or if such pointer exists but the window was closed */

        windowObjectReference = window.open(url, name, windowFeatures);
      } else if (previousUrl !== URL) {
        /* if the resource to load is different,
                       then we load it in the already opened secondary window and then
                       we bring such window back on top/in front of its parent window. */
        windowObjectReference = window.open(url, name, windowFeatures);
        windowObjectReference.focus();
      } else {
        /* else the window reference must exist and the window
                       is not closed; therefore, we can bring it back on top of any other
                       window with the focus() method. There would be no need to re-create
                       the window or to reload the referenced resource. */
        windowObjectReference.focus();
      }

      // add the listener for receiving a message from the popup
      window.addEventListener('message', (event) => receiveMessage(event), false);

      // assign the previous URL
      previousUrl = url;
    };

    // call the window function
    openSignInWindow(URL, windowName);
  };
