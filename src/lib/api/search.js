import axios from '../axios';

export const searchAPI = text => {
  if (!text) return Promise.resolve ({ zabos: [], groups: [], categories: [] });
  const { query, category } = text;
  return axios.get (`/search?query=${encodeURIComponent (query)}&category=${encodeURIComponent (category)}`);
};

export const searchUsers = query => {
  if (!query) return Promise.resolve ([]);
  return axios.get (`/search/user?query=${encodeURIComponent (query)}`);
};
