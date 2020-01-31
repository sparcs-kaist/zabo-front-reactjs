import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import axios from 'lib/axios';

import searchIcon from 'static/images/search-icon-navy.png';
import { SearchBarWrapper } from './SearchBar.styled';

import { TAGS } from '../../../lib/variables';
import useSetState from '../../../hooks/useSetState';

/* ==== search bar debounce ==== */
const searchAPI = text => {
  if (!text) return Promise.resolve ({ zabos: [], groups: [], categories: [] });
  return axios.get (`/search?query=${encodeURIComponent (text)}`);
};
const searchAPIDebounced = AwesomeDebouncePromise (searchAPI, 500);

const SearchBar = ({ isOpen, options }) => {
  const [state, setState, onChangeHandler] = useSetState ({
    search: '',
    zaboSearch: [],
    uploaderSearch: [],
    keywordSearch: [],
    searchResults: {},
    searchFocused: false,
  });

  const {
    search, zaboSearch, searchResults, uploaderSearch, keywordSearch, searchFocused,
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
        [query]: data,
      },
    }));
  };

  const _handleFocusBlur = e => {
    setState (prevState => ({
      searchFocused: !prevState.searchFocused,
    }));
  };

  const onTagClick = e => {
    // console.log('value: ', e.target.value);
  };

  const searchWithTagComponent = (
    <div>
      <h3>태그로 검색하기</h3>
      <SearchBarWrapper.Body.TagBtn>
        {TAGS.map ((tag, idx) => (
          <button key={idx} value={tag} className="tag-button" onClick={onTagClick}>{tag}</button>
        ))}
      </SearchBarWrapper.Body.TagBtn>
    </div>
  );

  const searchResultComponent = (
    <div>
      <h3>자보</h3>
      <ul>
        {zaboSearch.map ((zabo, idx) => (
          <li key={idx}>
            <Link to={`/zabo/${zabo._id}`}>{zabo.title}</Link>
          </li>
        ))}
        {zaboSearch.length === 0 && <li>No Results</li>}
      </ul>
      <h3>그룹</h3>
      <ul>
        {uploaderSearch.map ((uploader, idx) => (
          <li key={idx}>
            <Link to={`/group/${uploader.name}`}>{uploader.name}</Link>
          </li>
        ))}
        {uploaderSearch.length === 0 && <li>No Results</li>}
      </ul>
      <h3>Keyword</h3>
      <ul>
        {keywordSearch.map ((keyword, idx) => (
          <li key={idx}>
            <Link to="/">{keyword}</Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <SearchBarWrapper searchFocused={searchFocused}>
      <SearchBarWrapper.Header>
        <SearchBarWrapper.Header.SearchBar searchFocused={searchFocused}>
          <input
            id="search-input"
            type="text"
            placeholder="자보, 그룹, #태그 검색"
            onChange={_handleChange}
            onFocus={_handleFocusBlur}
            onBlur={_handleFocusBlur}
            {...options}
          />
        </SearchBarWrapper.Header.SearchBar>
        <img className="search-icon" src={searchIcon} alt="search icon" />
      </SearchBarWrapper.Header>
      <div className="divider"> </div>
      <SearchBarWrapper.Body search={search} searchFocused={searchFocused}>
        {
          !search
            ? searchWithTagComponent
            : searchResultComponent
        }
      </SearchBarWrapper.Body>
    </SearchBarWrapper>
  );
};

SearchBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

SearchBar.defaultProps = {};

export default SearchBar;
