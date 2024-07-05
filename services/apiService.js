// apiService.js
import { useTokenStore } from "../stores/token";

export default class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL || 'http://localhost/api';
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
      // const response = await $fetch(`${this.baseURL}/${endpoint}`, options);
      // return response;

      const response = await fetch(`${this.baseURL}/${endpoint}`, options);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "API Error");
      }
      return await response.json();
    } catch (error) {
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
