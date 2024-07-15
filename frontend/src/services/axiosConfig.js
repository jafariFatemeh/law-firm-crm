// src/services/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://backend-0vwz.onrender.com/api',
});

export default axiosInstance;
