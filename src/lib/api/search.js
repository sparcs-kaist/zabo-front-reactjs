import queryString from 'query-string';

import axios from '../axios';

export const searchAPI = ({ query, category }) => {
  if (!query && !category) return Promise.resolve ({ zabos: [], groups: [] });
  return axios.get (`/search?${queryString.stringify ({ query, category })}`);
};

export const statSearch = ({ query, category }) => {
  if (!query && !category) return null;
  return axios.get (`/search/stat?${queryString.stringify ({ query, category })}`);
};

export const searchUsers = query => {
  if (!query) return Promise.resolve ([]);
  return axios.get (`/search/user?query=${encodeURIComponent (query)}`);
};
