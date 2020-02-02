import axios from '../axios';

export const searchAPI = text => {
  if (!text) return Promise.resolve ({ zabos: [], groups: [], categories: [] });
  return axios.get (`/search?query=${encodeURIComponent (text)}`);
};

export const searchUsers = query => {
  if (!query) return Promise.resolve ([]);
  return axios.get (`/search/user?query=${encodeURIComponent (query)}`);
};
