import axios, { type AxiosInstance, type AxiosRequestConfig as Config } from "axios";

class Axios {
  private static instance: Axios;

  private token?: string;
  private interceptor: number | null;
  private session: AxiosInstance;

  private constructor() {
    this.session = axios.create({
      headers: {
        post: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
      timeout: 30000,
      baseURL: `${process.env.REACT_APP_API_HOST || ""}/api`,
      withCredentials: true,
    });
    this.interceptor = null;
    this.interceptResponse();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Axios();
    }
    return this.instance;
  }

  updateToken(newToken: string) {
    if (this.token === newToken) return;
    this.token = newToken;
    this.interceptRequestWithToken();
  }

  private interceptRequestWithToken() {
    const { token } = this;

    if (this.interceptor !== null) {
      this.session.interceptors.request.eject(this.interceptor);
      this.interceptor = null;
    }

    if (!token) return;

    this.interceptor = this.session.interceptors.request.use((config) => {
      if (config.url?.[0] === "/") {
        Object.assign(config, {
          headers: {
            Authorization: `Bearer ${token}`,
            ...config.headers,
          },
        });
      }

      return config;
    });
  }

  private interceptResponse() {
    this.session.interceptors.response.use(
      (res) => res.data,
      (error) => {
        throw error?.response?.data || error;
      },
    );
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  get = <T, D = any>(url: string, config?: Config<D>) => this.session.get<T, T, D>(url, config);
  delete = <T, D = any>(url: string, config?: Config<D>) =>
    this.session.delete<T, T, D>(url, config);
  head = <T, D = any>(url: string, config?: Config<D>) => this.session.head<T, T, D>(url, config);
  options = <T, D = any>(url: string, config?: Config<D>) =>
    this.session.options<T, T, D>(url, config);
  post = <T, D = any>(url: string, data: D, config?: Config<D>) =>
    this.session.post<T, T, D>(url, data, config);
  put = <T, D = any>(url: string, data: D, config?: Config<D>) =>
    this.session.put<T, T, D>(url, data, config);
  patch = <T, D = any>(url: string, data: D, config?: Config<D>) =>
    this.session.patch<T, T, D>(url, data, config);
  postForm = <T, D = any>(url: string, data: D, config?: Config<D>) =>
    this.session.post<T, T, D>(url, data, config);
  putForm = <T, D = any>(url: string, data: D, config?: Config<D>) =>
    this.session.put<T, T, D>(url, data, config);
  patchForm = <T, D = any>(url: string, data: D, config?: Config<D>) =>
    this.session.patch<T, T, D>(url, data, config);
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export default Axios.getInstance();
