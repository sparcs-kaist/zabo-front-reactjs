import store from 'store';
import 'devtools-detect';
import { checkAuth } from 'store/reducers/auth';
import storage from 'lib/storage';
import axios from 'lib/axios';
import serializer from './lib/immutable';
import { initialize } from './store/reducers/upload';

const pwaInstallPromptListener = () => {
  window.addEventListener ('beforeinstallprompt', e => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault ();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    window.pwaPromptActive = true;
    document.body.classList.add ('pwa-prompt-active');
    if (window.onPWAPromptActive) {
      window.onPWAPromptActive ();
    }
  });
};

export default () => {
  (function () {
    const throttle = function (type, name, givenObj) {
      const obj = givenObj || window;
      let running = false;
      const func = function () {
        if (running) {
          return;
        }
        running = true;
        requestAnimationFrame (() => {
          obj.dispatchEvent (new CustomEvent (name));
          running = false;
        });
      };
      obj.addEventListener (type, func);
    };

    /* init - you can init any event */
    throttle ('resize', 'optimizedResize');
    throttle ('scroll', 'optimizedScroll');
  } ());

  pwaInstallPromptListener ();

  const uploadPersist = storage.getItem ('uploadPersist', false);
  if (uploadPersist) {
    store.dispatch (initialize (serializer.parse (uploadPersist)));
  }

  const token = storage.getItem ('token');
  axios.updateToken (token);

  if (token) {
    store.dispatch (checkAuth (token));
  }
};

window.addEventListener ('devtoolschange', event => {
  import ('./static/images/recruitAscii').then (asciiArt => {
    // console.log (asciiArt.default);
  });
});
