// apiService.js
import { useTokenStore } from "../stores/token";
const app_env = import.meta.env.VITE_APP_ENV;
const base_url = import.meta.env.VITE_LOCAL_BASE_URL;
const test_base_url = import.meta.env.VITE_TEST_BASE_URL;
const prod_url = import.meta.env.VITE_PROD_BASE_URL;
export default class ApiService {
  constructor(baseURL=null) {
    if(app_env === "local"){
      this.baseURL = base_url || base_url || 'http://localhost/api';
    }else if(app_env === "dev"){
      this.baseURL = test_base_url || test_base_url || 'https://dev-back.car-check.info/api';
    }else if(app_env === "prod"){
      this.baseURL = prod_url || 'https://car-check.io';
    }else{
      this.baseURL = base_url || base_url || 'http://localhost/api';
    }
  }

  async request(endpoint, method, data = null) {
    const tokenStore = useTokenStore();
    const token = tokenStore.getToken;

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const options = {
      method,
      headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.baseURL}/${endpoint}`, options);
      const responseData = await response.json();

      if (!response.ok) {
        throw { status: response.status, data: responseData };
      }
      return responseData;

    } catch (error) {
      console.log("error: ", error);
      console.error(`${method} ${endpoint} error:`, error);
      throw error;
    }
  }

  get(endpoint, token) {
    return this.request(endpoint, 'GET', null, token);
  }

  post(endpoint, data, token) {
    return this.request(endpoint, 'POST', data, token);
  }

  put(endpoint, data, token) {
    return this.request(endpoint, 'PUT', data, token);
  }

  delete(endpoint, token) {
    return this.request(endpoint, 'DELETE', null, token);
  }
}
