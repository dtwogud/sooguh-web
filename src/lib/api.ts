import axios from "axios";
import { redirect } from "next/navigation";

class ApiError extends Error {
  id?: string;
  status?: number;

  constructor(options: { status?: number; id?: string; message?: string }) {
    const { status, id, message = "" } = options;
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    this.status = status;
  }
}

type METHOD = "get" | "delete" | "head" | "post" | "put" | "patch";

export class ApiService<T> {
  url: string;
  method: METHOD;
  params?: any;
  data?: any;

  constructor(options: {
    url: string;
    method?: METHOD;
    params?: any;
    data?: any;
  }) {
    const { url, method = "get", params, data } = options;
    this.url = url;
    this.method = method;
    this.params = params;
    this.data = data;
  }

  appendParamsToURLSearchParams(params: any, queryParams: URLSearchParams) {
    if (params) {
      Object.keys(params).forEach((key) => {
        const value = params[key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            queryParams.append(key, item);
          });
        } else {
          queryParams.append(key, value);
        }
      });
    }
  }

  async request() {
    if (typeof window === "undefined") {
      const { headers } = await import("next/headers");
      const queryParams = new URLSearchParams();
      this.appendParamsToURLSearchParams(this.params, queryParams);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL!}/api${this.url}?${
          queryParams ? queryParams : ""
        }`,
        { headers: headers() },
      );

      if (res.ok) {
        try {
          return await res.json();
        } catch (e) {
          return await res.text();
        }
      }
      let id, message;
      try {
        const data = await res.json();
        id = data.id;
        message = data.message;
      } catch (e) {
        if (res.status === 401 && message === "invalid_session")
          return redirect("/");
        message = await res.text();
      }
      throw new ApiError({ status: res.status, id, message });
    } else {
      try {
        const { data } = await axiosInstance.request({
          url: this.url,
          method: this.method,
          params: this.params,
          data: this.data,
        });
        return data;
      } catch (e: any) {
        if (
          e.response?.status === 401 &&
          e.response?.data?.message === "invalid_session"
        )
          return window.open("/");
        throw new ApiError({
          status: e.response?.status,
          id: e.response?.data?.id,
          message: e.response?.data?.message,
        });
      }
    }
  }
}

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL!}/api`,
  withCredentials: true,
  timeout: 20000,
});

if (process.env.NODE_ENV !== "production") {
  axiosInstance.interceptors.request.use(
    (config) => {
      const { url, method, params, data } = config;
      // eslint-disable-next-line no-console
      // console.log(
      //   `[Request]: ${JSON.stringify({ url, params, method, data }, null, 2)}`,
      // );
      return config;
    },
    (error) => Promise.reject(error),
  );
  axiosInstance.interceptors.response.use((response) => {
    // eslint-disable-next-line no-console
    // console.log(`[Response Data]: ${JSON.stringify(response.data, null, 2)}`);
    return response;
  }, errorHandler);
} else {
  axiosInstance.interceptors.response.use((response) => response, errorHandler);
}

async function errorHandler(e: any) {
  // eslint-disable-next-line no-console
  // console.log(`[Error Data]: ${JSON.stringify(e.response.data, null, 2)}`);
  try {
    if (
      (e.response.status === 401 &&
        e.response.data.message === "invalid_session") ||
      (e.response.status === 403 && e.response.data.message === "forbidden")
    ) {
      window.open("/", "_self");
    }
  } catch (e) {}
  throw e;
}

export default axiosInstance;
