import "devtools-detect";

import { env } from "./env";

import moment from "moment";

import store from "store";
import { checkAuth } from "store/reducers/auth";
import { initialize } from "store/reducers/upload";
import axios from "lib/axios";
import storage from "lib/storage";

import { parseJSON } from "./lib/utils";

const pwaInstallPromptListener = () => {
  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    window.pwaPromptActive = true;
    document.body.classList.add("pwa-prompt-active");
    if (window.onPWAPromptActive) {
      window.onPWAPromptActive();
    }
  });
};

export default () => {
  (() => {
    const throttle = (type, name, givenObj) => {
      const obj = givenObj || window;
      let running = false;
      const func = () => {
        if (running) {
          return;
        }
        running = true;
        requestAnimationFrame(() => {
          obj.dispatchEvent(new CustomEvent(name));
          running = false;
        });
      };
      obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
    throttle("scroll", "optimizedScroll");
  })();

  pwaInstallPromptListener();

  const uploadPersist = storage.getItem("uploadPersist");
  if (uploadPersist) {
    if (uploadPersist.date) {
      store.dispatch(initialize(uploadPersist));
    } else {
      storage.removeItem("uploadPersist");
    }
  }

  const token = storage.getItem("token");
  axios.updateToken(token);

  if (token) {
    store.dispatch(checkAuth(token));
  }
};

window.addEventListener("devtoolschange", () => {
  if (env.NODE_ENV !== "production") return;
  import("static/images/recruitAscii").then((asciiArt) => {
    // eslint-disable-next-line no-console
    console.log(asciiArt.default);
  });
});
