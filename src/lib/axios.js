import axios from 'axios';

const singleton = Symbol ('singleton');
const singletonEnforcer = Symbol ('singletonEnforcer');

class Axios {
  constructor (enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error ('Cannot construct singleton');
    }
    this.session = axios.create ({
      headers: {
        post: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
      timeout: 30000,
      baseURL: `${process.env.REACT_APP_API_HOST || ''}/api`,
      withCredentials: true,
    });
    this._interceptor = null;
    this.token = '';
    this._interceptResponse ();
  }

  static get instance () {
    if (!this[singleton]) {
      this[singleton] = new Axios (singletonEnforcer);
    }
    return this[singleton];
  }

  updateToken (newToken) {
    if (this.token === newToken) return;
    this.token = newToken;
    this._interceptRequestWithToken ();
  }

  _interceptRequestWithToken () {
    const { token } = this;

    if (this._interceptor !== null) {
      this.session.interceptors.request.eject (this._interceptor);
      this._interceptor = null;
    }

    if (!token || typeof token === 'undefined' || token === '') return;

    this._interceptor = this.session.interceptors.request.use (config => {
      if (config.url[0] === '/') {
        Object.assign (config, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            ...config.headers,
          },
        });
      }
      return config;
    });
  }

  _interceptResponse () {
    this.session.interceptors.response.use (res => res.data, error => {
      if (!error.response) throw error;
      const { data } = error.response;
      if (!data) throw error;
      throw data;
    });
  }

get = (...params) => this.session.get (...params)

post = (...params) => this.session.post (...params)

put = (...params) => this.session.put (...params)

delete = (...params) => this.session.delete (...params)

patch = (...params) => this.session.patch (...params)

head = (...params) => this.session.head (...params)
}

export default Axios.instance;
