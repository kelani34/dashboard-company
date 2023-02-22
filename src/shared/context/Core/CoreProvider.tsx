import React, { memo, ReactNode, useCallback, useEffect } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useDispatch } from 'react-redux';
import Pusher from 'pusher-js';
import { setPusher } from 'Containers/Core/actions';

interface Props {
  children: ReactNode;
}

const hostName = window.location.hostname;

const CoreProvider = ({ children }: Props) => {
  const dispatch = useDispatch();
  // Smartlook script
  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production' && hostName === 'app.rocketplantech.com';

    const script = document.createElement('script');

    if (isProduction) {
      const scriptText = document.createTextNode(`window.smartlook||(function(d) {
    var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
    var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
    c.charset='utf-8';c.src='https://rec.smartlook.com/recorder.js';h.appendChild(c);
    })(document);
    smartlook('init', '83c3f976cec1ea55ac8f1059c9e0843343632e03');`);

      script.appendChild(scriptText);
      document.head.appendChild(script);
    }

    return () => {
      if (script && isProduction) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Facebook pixel
  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production' && hostName === 'app.rocketplantech.com';

    const script = document.createElement('script');

    if (isProduction) {
      const scriptText =
        document.createTextNode(`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');

fbq('init', '827642987952786');
fbq('track', 'PageView');`);

      script.appendChild(scriptText);
      document.head.appendChild(script);
    }

    return () => {
      if (script && isProduction) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Google analytics
  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production' && hostName === 'app.rocketplantech.com';

    const mainScript = document.createElement('script');
    const textScript = document.createElement('script');

    if (isProduction) {
      mainScript.src = 'https://www.googletagmanager.com/gtag/js?id=UA-163857270-1';
      mainScript.async = true;
      document.head.appendChild(mainScript);

      const scriptText = document.createTextNode(`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-465765007');
gtag('config', 'UA-163857270-1');`);

      textScript.appendChild(scriptText);
      document.head.appendChild(textScript);
    }

    return () => {
      if (mainScript && isProduction) {
        document.head.removeChild(mainScript);
      }
      if (textScript && isProduction) {
        document.head.removeChild(textScript);
      }
    };
  }, []);

  // pusher for websockets
  const initPusher = useCallback(async () => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, { cluster: 'us2' });
    dispatch(setPusher(pusher));
  }, []);

  useEffect(() => {
    (async () => {
      await initPusher();
    })();
  }, []);

  return <>{children}</>;
};

const CoreProviderMemo = memo(CoreProvider, areEqual);

export { CoreProviderMemo as CoreProvider };
