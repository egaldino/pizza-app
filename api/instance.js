import axios from 'axios';

import apiConfig from '../api.json';

const axiosInstace = axios.create({
  baseURL: apiConfig.API_URL,
  timeout: 1000,
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});

export default axiosInstace;
