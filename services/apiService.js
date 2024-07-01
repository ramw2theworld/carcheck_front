// apiService.js
export default class ApiService {
    constructor(baseURL) {
      this.baseURL = baseURL || 'http://localhost/api';
    }
  
    async request(endpoint, method, data = null, token = null) {
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
        const response = await $fetch(`${this.baseURL}/${endpoint}`, options);
        return response;
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
  