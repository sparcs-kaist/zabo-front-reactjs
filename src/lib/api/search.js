import queryString from "query-string";

import axios from "../axios";

export const searchSimpleAPI = ({ query, category }) => {
  if (!query && (!category || !category.length)) return Promise.resolve({ zabos: [], groups: [] });
  return axios.get(`/search/simple?${queryString.stringify({ query, category })}`);
};

export const searchAPI = ({ query, category, stat }) => {
  if (!query && (!category || !category.length)) return Promise.resolve({ zabos: [], groups: [] });
  return axios.get(`/search?${queryString.stringify({ query, category, stat })}`);
};

export const searchUsers = (query) => {
  if (!query) return Promise.resolve([]);
  return axios.get(`/search/user?query=${encodeURIComponent(query)}`);
};
