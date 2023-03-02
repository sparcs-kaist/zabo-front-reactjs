import { Axios } from "axios";
import { env } from "../env";

class CustomAxios extends Axios {
  private token?: string;
  private interceptor: number | null;

  private static instance: CustomAxios;

  private constructor() {
    super({
      timeout: 30000,
      baseURL: `${env.REACT_APP_API_HOST || ""}/api`,
      withCredentials: true,
    });
    this.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    this.interceptor = null;
    this.interceptResponse();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new CustomAxios();
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
      this.interceptors.request.eject(this.interceptor);
      this.interceptor = null;
    }

    if (!token) return;

    this.interceptor = this.interceptors.request.use((config) => {
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
    this.interceptors.response.use(
      (res) => res.data,
      (error) => {
        throw error?.response?.data || error;
      },
    );
  }
}

export default CustomAxios.getInstance();
