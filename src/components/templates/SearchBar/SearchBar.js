import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import queryString from 'query-string';

import TagList from 'atoms/TagList';

import useSetState from 'hooks/useSetState';
import { searchAPI } from 'lib/api/search';

import cancelIcon from 'static/images/cancel.png';
import groupDefaultProfile from 'static/images/groupDefaultProfile.png';
import searchIcon from 'static/images/search-icon-navy.png';
import searchIconWhite from 'static/images/search-icon-white.png';

import { SearchBarContainer, SearchBarWrapper } from './SearchBar.styled';

/* ==== search bar debounce ==== */
const searchAPIDebounced = AwesomeDebouncePromise (searchAPI, 500);

const icons = {
  primary: searchIcon,
  white: searchIconWhite,
};

const SearchBar = ({
  isOpen, options, type, transparent, iconColor,
}) => {
  const isMounted = useRef (true);
  const inputRef = useRef (null);
  // make isMounted 'false' when component unmounted
  useEffect (() => () => { isMounted.current = false; }, []);
  const history = useHistory ();
  const [state, setState, onChangeHandler] = useSetState ({
    search: '',
    zaboSearch: [],
    uploaderSearch: [],
    searchResults: {},
    searchFocused: false,
  });

  const {
    search, zaboSearch, searchResults, uploaderSearch, searchFocused,
  } = state;

  const _updateResults = data => {
    const { zabos, groups } = data;
    setState ({
      zaboSearch: zabos,
      uploaderSearch: groups,
    });
  };

  const _handleChange = e => {
    const { value: query } = e.target;
    setState ({ search: query });
    if (searchResults[query]) {
      // load from caching : show temporal search cached results
      _updateResults (searchResults[query]);
      // donot return; TO get new updated search result
    }
    if (query.trim ().length > 0) {
      searchAPIDebounced ({ query })
        .then (data => {
          if (!isMounted.current) return;
          _updateResults (data);
          setState (prevState => ({
            searchResults: {
              [query]: data,
            },
          }));
        }).catch (err => console.log ('change error'));
    }
  };

  const _handleKeyPress = e => {
    // onKeyDown, onKeyUp : korean word call event twice...
    // searchBar input can only accept 'query text'
    // category search can be done only by clicking tag button
    if (e.key === 'Enter') {
      setState ({
        searchFocused: false,
      });
      inputRef.current.blur ();
      // prevent action by debounce api
      isMounted.current = false;
      if (search.trim ().length > 0) {
        const stringified = queryString.stringify ({ query: search });
        history.push (`/search?${stringified}`);
      }
    }
  };

  const _handleFocus = useCallback (e => {
    e.stopPropagation ();
    e.nativeEvent.stopImmediatePropagation ();
    setState ({
      searchFocused: true,
    });
  }, [setState]);

  const _handleBlur = useCallback (e => {
    e.stopPropagation ();
    e.nativeEvent.stopImmediatePropagation ();
    setState ({
      searchFocused: false,
    });
  }, [setState]);

  const onTagClick = (category) => {
    const stringified = queryString.stringify ({ category });
    setState ({
      searchFocused: false,
    });
    history.push (`/search?${stringified}`);
  };

  const onCancelClick = e => {
    setState ({ search: '' });
  };

  const isZaboSearchEmpty = zaboSearch.length === 0;
  const isUploaderSearchEmpty = uploaderSearch.length === 0;
  const isResultsEmpty = isZaboSearchEmpty && isUploaderSearchEmpty;

  const searchWithTagComponent = (
    <div>
      <h3>태그로 검색하기</h3>
      <TagList onTagClick={onTagClick} type="searchBar" />
    </div>
  );

  const searchResultComponent = (
    <div>
      {!isZaboSearchEmpty && (
        <div>
          <h3>자보</h3>
          <ul>
            {zaboSearch.map ((zabo, idx) => (
              <li key={idx}>
                <Link to={`/zabo/${zabo._id}`}>{zabo.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!isUploaderSearchEmpty && (
        <div>
          <h3>그룹</h3>
          <ul>
            {uploaderSearch.map ((uploader, idx) => (
              <li key={idx}>
                {
                  uploader.profilePhoto
                    ? <img src={uploader.profilePhoto} alt="group profile photo" />
                    : <img src={groupDefaultProfile} alt="default group profile photo" />
                }
                <Link to={`/${uploader.name}`}>{uploader.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <SearchBarContainer>
      {searchFocused ? <div id="dimmer" onClick={_handleBlur}> </div> : ''}
      <SearchBarWrapper type={type} searchFocused={searchFocused} transparent={transparent}>
        <SearchBarWrapper.Header type={type} searchFocused={searchFocused}>
          <SearchBarWrapper.Header.SearchBar type={type} searchFocused={searchFocused} transparent={transparent}>
            <input
              autoComplete="off"
              id="search-input"
              type="text"
              placeholder="자보, 그룹 검색"
              value={search}
              onChange={_handleChange}
              onClick={_handleFocus}
              onKeyPress={_handleKeyPress}
              ref={inputRef}
              {...options}
            />
          </SearchBarWrapper.Header.SearchBar>
          <img
            className="search-icon"
            src={searchFocused ? icons.primary : icons[iconColor]}
            onClick={_handleFocus}
            alt="search icon"
          />
          { search ? <img className="cancel-icon" onClick={onCancelClick} src={cancelIcon} alt="cancel icon" /> : '' }
        </SearchBarWrapper.Header>
        {searchFocused ? <div className="divider"> </div> : ''}
        <SearchBarWrapper.Body
          search={search}
          searchFocused={searchFocused}
          isResultsEmpty={isResultsEmpty}
        >
          {
            !search
              ? searchWithTagComponent
              : searchResultComponent
          }
        </SearchBarWrapper.Body>
      </SearchBarWrapper>
    </SearchBarContainer>
  );
};

SearchBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  type: PropTypes.string,
  transparent: PropTypes.bool,
  iconColor: PropTypes.oneOf (['white', 'primary']),
};

SearchBar.defaultProps = {
  type: '',
  transparent: false,
  iconColor: 'primary',
};

export default SearchBar;
