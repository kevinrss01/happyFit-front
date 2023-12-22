import axios from "axios";

export const baseURLBackend = process.env.NEXT_PUBLIC_BASE_URL_BACKEND;
const formatUrl = (url: string) => `${baseURLBackend}/${url}`;
const defaultHeaders = { headers: {} };

interface Headers {
  headers: { [key: string]: string | number | undefined };
}

class AxiosCallApi {
  static async get<R>(url: string, headers?: Headers): Promise<R> {
    try {
      const response = await axios.get<R>(
        formatUrl(url),
        headers ? headers : defaultHeaders
      );
      return response.data;
    } catch (error: any) {
      console.error(error?.response ? error.response?.data?.message : error);
      throw new Error(error);
    }
  }

  static async post<T, R>(url: string, data: T, headers?: Headers): Promise<R> {
    try {
      const response = await axios.post(
        formatUrl(url),
        data,
        headers ? headers : defaultHeaders
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.data?.errors) {
        console.error("bye");
        console.error(error?.response?.data?.errors);
      } else {
        console.error("hello");
        console.error(
          error?.response ? error.response?.data?.message : "aaaaaaaaaaaaa"
        );
      }

      throw new Error(error.response?.data?.message || error);
    }
  }

  static async delete(url: string, headers?: Headers) {
    try {
      const response = await axios.delete(
        formatUrl(url),
        headers ? headers : defaultHeaders
      );
      return response.data;
    } catch (error: any) {
      console.error(error?.response ? error.response?.data?.message : error);
      throw new Error(error);
    }
  }

  static async put<T>(url: string, data: T, headers: Headers) {
    try {
      const response = await axios.put(formatUrl(url), data, headers);
      return response.data;
    } catch (error: any) {
      console.error(error?.response ? error.response?.data?.message : error);
      throw new Error(error);
    }
  }

  static async patch<T, R>(url: string, data: T): Promise<R> {
    try {
      const response = await axios.patch(formatUrl(url), data, defaultHeaders);
      return response.data;
    } catch (error: any) {
      console.error(error?.response ? error.response?.data?.message : error);
      throw new Error(error);
    }
  }

  static saveTokenAxios(accessToken: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
  //
  // static tokenSaved() {
  //   return Boolean(axios.defaults.headers.common.Authorization);
  // }

  // static getTokenAxiosOrLocalStorage() {
  //   if (this.tokenSaved()) {
  //     const token = axios.defaults.headers.common.Authorization;
  //     return token.replace("Bearer ", "");
  //   } else {
  //     const savedToken = getItemFromLocalStorage(TOKEN_ACCESSOR);
  //     if (savedToken) this.saveToken(savedToken.token);
  //     return savedToken ? savedToken.token : "";
  //   }
  // }
}

export default AxiosCallApi;
