import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import axios from 'lib/axios';

import searchIcon from 'static/images/search-icon-navy.png';
import SearchBarWrapper from './SearchBar.styled';
import useSetState from '../../../hooks/useSetState';

/* ==== search bar debounce ==== */
const searchAPI = text => {
  if (!text) return Promise.resolve ({ zabos: [], groups: [], categories: [] });
  return axios.get (`/search?query=${encodeURIComponent (text)}`);
};
const searchAPIDebounced = AwesomeDebouncePromise (searchAPI, 1000);

const SearchBar = ({ isOpen, options }) => {
  const [state, setState, onChangeHandler] = useSetState ({
    search: '',
    zaboSearch: [],
    uploaderSearch: [],
    keywordSearch: [],
    searchResults: {},
  });

  const {
    zaboSearch, searchResults, uploaderSearch, keywordSearch,
  } = state;

  const _updateResults = data => {
    const { zabos, groups, categories } = data;
    setState ({
      zaboSearch: zabos,
      uploaderSearch: groups,
      keywordSearch: categories,
    });
  };

  const _handleChange = async e => {
    const { value: query } = e.target;
    setState ({ search: query });
    if (searchResults[query]) {
      // load from caching
      _updateResults (searchResults[query]);
    }
    const data = await searchAPIDebounced (query);
    _updateResults (data);
    setState (prevState => ({
      searchResults: {
        ...prevState.searchResults,
        [query]: data,
      },
    }));
  };

  return (
    <SearchBarWrapper>
      <div className="search">
        <div className="search-bar">
          <input
            className="search-input"
            placeholder="Search"
            onChange={_handleChange}
            {...options}
          />
        </div>
        <img className="search-icon" src={searchIcon} alt="search" />
      </div>
      <div className={`search-result ${isOpen ? 'show' : 'hide'}`}>
        <h3>Zabo</h3>
        <ul>
          {zaboSearch.map ((zabo, idx) => (
            <li key={idx}>
              <Link to={`/zabo/${zabo._id}`}>{zabo.title}</Link>
            </li>
          ))}
          {zaboSearch.length === 0 && <li>No Results</li>}
        </ul>
        <h3>Uploader</h3>
        <ul>
          {uploaderSearch.map ((uploader, idx) => (
            <li key={idx}>
              <Link to={`/group/${uploader.name}`}>{uploader.name}</Link>
            </li>
          ))}
          {uploaderSearch.length === 0 && <li>No Results</li>}
        </ul>
        <h3>Keyword</h3>
        <ul className="keyword-result">
          {keywordSearch.map (keyword => (
            <li>
              <Link to="/">{keyword}</Link>
            </li>
          ))}
        </ul>
      </div>
    </SearchBarWrapper>
  );
};

SearchBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

SearchBar.defaultProps = {};

export default SearchBar;
