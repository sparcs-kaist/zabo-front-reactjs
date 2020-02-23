import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import queryString from 'query-string';

import TagList from 'atoms/TagList';

import useSetState from 'hooks/useSetState';
import { searchAPI } from 'lib/api/search';
import { parseQuery } from 'lib/utils';

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

const searchResults = {};

const SearchBar = ({
  options, type, transparent, iconColor,
}) => {
  const isMounted = useRef (true);
  const inputRef = useRef (null);
  useEffect (() => () => { isMounted.current = false; }, []);
  const history = useHistory ();
  const { search } = useLocation ();
  const { safeQuery, safeCategory } = parseQuery (search);
  const [state, setState, onChangeHandler] = useSetState ({
    query: safeQuery,
    category: safeCategory,
    zabos: [],
    groups: [],
    searchFocused: false,
    error: null,
  });

  const {
    query, category, zabos, groups, searchFocused,
  } = state;

  const _handleChange = useCallback (e => {
    const { value: newQuery } = e.target;
    setState ({ query: newQuery });
    const key = `${newQuery}#`.concat (category);
    if (searchResults[key]) {
      setState (searchResults[key]);
    }
    if (newQuery.trim ().length > 0) {
      searchAPIDebounced ({ query: newQuery, category })
        .then (data => {
          if (!isMounted.current) return;
          searchResults[key] = data;
          setState (data);
        })
        .catch (error => {
          setState ({ zabos: [], groups: [], error });
        });
    }
  }, [state, setState]);

  const _handleKeyDown = useCallback (e => {
    if (e.key === 'Enter') {
      setState ({ searchFocused: false });
      inputRef.current.blur ();
      isMounted.current = false;
      if (query.trim ().length > 0) {
        const stringified = queryString.stringify ({ query, category });
        history.push (`/search?${stringified}`);
      }
    }
  }, [state, setState]);

  const _handleFocus = useCallback (e => {
    e.stopPropagation ();
    e.nativeEvent.stopImmediatePropagation ();
    setState ({ searchFocused: true });
  }, [setState]);

  const _handleBlur = useCallback (e => {
    e.stopPropagation ();
    e.nativeEvent.stopImmediatePropagation ();
    setState ({ searchFocused: false });
  }, [setState]);

  const onTagClick = (newCat) => {
    setState ({ searchFocused: false });
    history.push (`/search?${queryString.stringify ({ category: newCat })}`);
  };

  const onCancelClick = useCallback (e => {
    setState ({ query: '' });
  }, [setState]);

  const isResultsEmpty = !zabos.length && !groups.length;

  const searchWithTagComponent = (
    <div>
      <h3>태그로 검색하기</h3>
      <TagList onTagClick={onTagClick} type="searchBar" />
    </div>
  );

  const searchResultComponent = (
    <div>
      {!!zabos.length && (
        <div>
          <h3>자보</h3>
          <ul>
            {zabos.map ((zabo) => (
              <li key={zabo._id}>
                <Link to={`/zabo/${zabo._id}`}>{zabo.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!!groups.length && (
        <div>
          <h3>그룹</h3>
          <ul>
            {groups.map ((group) => (
              <li key={group._id}>
                {
                  group.profilePhoto
                    ? <img src={group.profilePhoto} alt="group profile photo" />
                    : <img src={groupDefaultProfile} alt="default group profile photo" />
                }
                <Link to={`/${group.name}`}>{group.name}</Link>
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
              value={query}
              onChange={_handleChange}
              onClick={_handleFocus}
              onKeyDown={_handleKeyDown}
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
          { query ? <img className="cancel-icon" onClick={onCancelClick} src={cancelIcon} alt="cancel icon" /> : '' }
        </SearchBarWrapper.Header>
        {searchFocused ? <div className="divider"> </div> : ''}
        <SearchBarWrapper.Body
          search={query}
          searchFocused={searchFocused}
          isResultsEmpty={isResultsEmpty}
        >
          {
            !query
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
