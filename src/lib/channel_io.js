class ChannelService {
  constructor() {
    this.loaded = false;
    this.onloaded = () => {};
    setTimeout (() => {
      this.loadScript();
      this.loaded = true;
      this.onloaded ();
    }, 2000);
  }

  loadScript() {
    let w = window;
    if (w.ChannelIO) {
      return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
    }
    let d = window.document;
    let ch = function() {
      ch.c(arguments);
    };
    ch.q = [];
    ch.c = function(args) {
      ch.q.push(args);
    };
    w.ChannelIO = ch;
    function l() {
      if (w.ChannelIOInitialized) {
        return;
      }
      w.ChannelIOInitialized = true;
      let s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
      s.charset = 'UTF-8';
      let x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    }
    if (document.readyState === 'complete') {
      l();
    } else if (window.attachEvent) {
      window.attachEvent('onload', l);
    } else {
      window.addEventListener('DOMContentLoaded', l, false);
      window.addEventListener('load', l, false);
    }
  }

  boot(settings) {
    if (!this.loaded) {
      this.onloaded = () => this.boot (settings);
      return;
    }
    window.ChannelIO('boot', settings);
  }

  shutdown() {
    if (!this.loaded) {
      this.onloaded = () => this.shutdown ();
      return;
    }
    window.ChannelIO('shutdown');
  }
}

export default new ChannelService();
