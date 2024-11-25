import { useTokenStore } from "@/stores/token";

const app_env = import.meta.env.VITE_APP_ENV;
const base_url = import.meta.env.VITE_LOCAL_BASE_URL;
const test_base_url = import.meta.env.VITE_TEST_BASE_URL;
const prod_url = import.meta.env.VITE_PROD_BASE_URL;

const setBaseUrl = (env) => {
  const urls = {
    local: base_url || "http://localhost/api",
    dev: test_base_url || "https://dev-back.car-check.info/api",
    prod: prod_url || "https://car-check.io",
  };
  return urls[env] || urls.local;
};

const ApiService = {
  async request(endpoint, method, data = null, token = null) {
    const tokenStore = useTokenStore();
    const tokenToUse = token || tokenStore.getToken;
    console.log("token to be used: ", tokenToUse);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (tokenToUse) {
      headers["Authorization"] = `Bearer ${tokenToUse}`;
    }

    const options = {
      method,
      headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    console.log("Request Options:", options);

    try {
      const baseURL = setBaseUrl(app_env);
      const response = await fetch(`${baseURL}/${endpoint}`, options);
      const responseData = await response.json();

      if (!response.ok) {
        console.error("API Error:", responseData);
        throw { status: response.status, data: responseData };
      }
      return responseData;

    } catch (error) {
      console.error(`${method} ${endpoint} error:`, error);
      throw error;
    }
  },

  get(endpoint, token = null) {
    return this.request(endpoint, "GET", null, token);
  },

  post(endpoint, data, token = null) {
    return this.request(endpoint, "POST", data, token);
  },

  put(endpoint, data, token = null) {
    return this.request(endpoint, "PUT", data, token);
  },

  delete(endpoint, token = null) {
    return this.request(endpoint, "DELETE", null, token);
  },
};

export default ApiService;
