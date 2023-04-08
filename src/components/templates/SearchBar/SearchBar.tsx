import React, {
  type InputHTMLAttributes,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type { Group, Zabo } from "lib/interface";

import { Link, useHistory, useLocation } from "react-router-dom";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import queryString from "query-string";

import TagList from "components/atoms/TagList";

import { searchSimpleAPI } from "lib/api/search";
import { parseQuery } from "lib/utils";

import cancelIcon from "static/images/cancel.png";
import groupDefaultProfile from "static/images/groupDefaultProfile.png";

import { SearchBarContainer, SearchBarWrapper } from "./SearchBar.styled";

/* ==== search bar debounce ==== */
const searchAPIDebounced = AwesomeDebouncePromise(searchSimpleAPI, 500);

const searchResults: Record<string, any> = {};

interface Props {
  isOpen: boolean;
  options?: InputHTMLAttributes<HTMLInputElement>;
  type?: "upload" | "search";
  transparent?: boolean;
  iconColor?: "white" | "primary";
}

const SearchBar: React.FC<Props> = ({ options, type, transparent, iconColor = "primary" }) => {
  const isMounted = useRef(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );
  const history = useHistory();
  const { search } = useLocation();
  const { safeQuery, safeCategory } = parseQuery(search);
  const [query, setQuery] = useState(safeQuery);
  const [category, setCategory] = useState(safeCategory);
  const [result, setResult] = useState<{
    groups: Group[];
    zabos: Zabo[];
  }>({
    zabos: [],
    groups: [],
  });
  const [isFocused, setFocused] = useState(false);
  const [error, setError] = useState(null);

  const { zabos, groups } = result;

  const _handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value: newQuery } = e.target;
      setQuery(newQuery);
      const key = `${newQuery}#`.concat(category.join("#"));
      if (key in searchResults) {
        setResult(searchResults[key]);
      }
      if (newQuery.trim().length > 0) {
        searchAPIDebounced({
          query: newQuery,
          category: [],
        })
          .then((data) => {
            if (!isMounted.current) return;
            searchResults[key] = data;
            setResult(data);
          })
          .catch((error) => {
            setResult({
              zabos: [],
              groups: [],
            });
            setError(error);
          });
      }
    },
    [setQuery, setResult, setError, category],
  );

  const _handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      // onKeyDown, onKeyUp : korean word call event twice...
      // searchBar input can only accept 'query text'
      // category search can be done only by clicking tag button
      if (e.key === "Enter") {
        setFocused(false);
        inputRef?.current?.blur();
        isMounted.current = false;
        if (query.trim().length > 0) {
          const stringified = queryString.stringify({
            query,
            category: [],
          });
          history.push(`/search?${stringified}`);
        }
      }
    },
    [query, setFocused],
  );

  const _handleFocusChange = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      setFocused((prev) => !prev);
    },
    [isFocused, setFocused],
  );

  const _handleInputFocusChange = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      setFocused(true);
    },
    [isFocused, setFocused],
  );

  const _handleBlur = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      setFocused(false);
    },
    [setFocused],
  );

  const onTagClick = useCallback(
    (newCat: string) => {
      setFocused(false);
      history.push(`/search?${queryString.stringify({ category: newCat })}`);
    },
    [setFocused],
  );

  const onCancelClick = useCallback(() => {
    setQuery("");
  }, [setQuery]);

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
            {zabos.map((zabo) => (
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
            {groups.map((group) => (
              <li key={group._id}>
                {group.profilePhoto ? (
                  <img src={group.profilePhoto} alt="group profile photo" />
                ) : (
                  <img src={groupDefaultProfile} alt="default group profile photo" />
                )}
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
      {isFocused ? (
        <div id="dimmer" onClick={_handleBlur}>
          {" "}
        </div>
      ) : (
        ""
      )}
      <SearchBarWrapper type={type} isFocused={isFocused} transparent={transparent}>
        <SearchBarWrapper.Header type={type} isFocused={isFocused} transparent={transparent}>
          <SearchBarWrapper.Header.SearchBar
            type={type}
            isFocused={isFocused}
            transparent={transparent}
          >
            <input
              autoComplete="off"
              id="search-input"
              type="text"
              placeholder="자보, 그룹 검색"
              value={query}
              onChange={_handleChange}
              onClick={_handleInputFocusChange}
              onKeyPress={_handleKeyPress}
              ref={inputRef}
              {...options}
            />
          </SearchBarWrapper.Header.SearchBar>
          <div className="search-icon" onClick={_handleFocusChange}>
            {" "}
          </div>
          {query && isFocused ? (
            <img
              className="cancel-icon"
              onClick={onCancelClick}
              src={cancelIcon}
              alt="cancel icon"
            />
          ) : (
            ""
          )}
        </SearchBarWrapper.Header>
        {isFocused ? <div className="divider"></div> : ""}
        <SearchBarWrapper.Body
          search={!!query}
          isFocused={isFocused}
          isResultsEmpty={isResultsEmpty}
        >
          {!query ? searchWithTagComponent : searchResultComponent}
        </SearchBarWrapper.Body>
      </SearchBarWrapper>
    </SearchBarContainer>
  );
};

export default SearchBar;
