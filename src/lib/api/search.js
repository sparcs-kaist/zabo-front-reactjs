import queryString from 'query-string';

import axios from '../axios';

export const searchAPI = text => {
  if (!text) return Promise.resolve ({ zabos: [], groups: [], categories: [] });
  const { query, category } = text;
  // to send category list (array format)
  const stringifiedCategory = queryString.stringify ({ category });
  return axios.get (`/search?query=${encodeURIComponent (query)}&category=${encodeURIComponent (stringifiedCategory)}`);
};

export const searchUsers = query => {
  if (!query) return Promise.resolve ([]);
  return axios.get (`/search/user?query=${encodeURIComponent (query)}`);
};
