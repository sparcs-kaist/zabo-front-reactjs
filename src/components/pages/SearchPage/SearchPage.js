import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import queryString from "query-string";

// import { searchAPI } from lib/api/search';
import TagList from "components/atoms/TagList";
import GroupList from "components/organisms/GroupList";
import Header from "components/templates/Header";
import ZaboList from "components/templates/ZaboList";

import { getSearch } from "store/reducers/zabo";
import useSetState from "hooks/useSetState";
import { parseQuery } from "lib/utils";

import searchIcon from "static/images/search-icon-navy.png";

import { EmptyResultW, GroupResultW, Page, ZaboResultW } from "./SearchPage.styled";

const Empty = ({ query, category, isZaboEmpty }) => {
  let label = "";
  if (query) label = query;
  if (category.length) label += " #".concat(category);
  return (
    <EmptyResultW isZaboEmpty={isZaboEmpty}>
      <img className="search-icon" src={searchIcon} alt="search icon" />
      <div className="empty-text">
        <div className="empty-query">{label}</div>에 대한 검색결과가 없습니다.
      </div>
      {!isZaboEmpty && (
        <p>
          없었어요?
          <br />
          없어요
          <br />
          아 있었는데?
          <br />
          아니 없어요 그냥
        </p>
      )}
    </EmptyResultW>
  );
};

Empty.defaultProps = {
  isZaboEmpty: false,
};

Empty.propTypes = {
  query: PropTypes.string.isRequired,
  category: PropTypes.arrayOf(PropTypes.string).isRequired,
  isZaboEmpty: PropTypes.bool,
};

const initialState = {
  zabos: [],
  groups: [],
};

const SearchPage = () => {
  const dispatch = useDispatch();
  const { search, state: isResearch } = useLocation();
  const history = useHistory();
  const { safeQuery, safeCategory } = parseQuery(search);

  const [state, setState] = useSetState(initialState);
  const { zabos, groups } = state;

  const isZaboEmpty = !zabos.length;
  const isGroupEmpty = !groups.length;
  const isAllEmpty = isZaboEmpty && isGroupEmpty;

  const _updateResults = useCallback(
    (data) => {
      const { zabos, groups } = data;
      setState({ zabos, groups });
    },
    [setState],
  );

  useEffect(() => {
    dispatch(getSearch({ query: safeQuery, category: safeCategory, stat: true }))
      .then((data) => _updateResults(data))
      .catch((err) => _updateResults(initialState));
  }, [safeQuery, safeCategory.join("")]);

  const onTagClick = (newCat) => {
    let newCats = safeCategory.slice();
    if (safeCategory.includes(newCat)) {
      newCats = newCats.filter((c) => c !== newCat);
    } else {
      newCats.push(newCat);
    }
    const search = {};
    if (safeQuery) search.query = safeQuery;
    if (newCats.length) search.category = newCats;
    history.push(`/search?${queryString.stringify(search)}`, { state: true });
  };

  return (
    <Page>
      <Header type="search" scrollHeader />
      {isAllEmpty && !isResearch ? (
        <Empty query={safeQuery} category={safeCategory} />
      ) : (
        <Page.Body>
          <GroupResultW>
            {!isGroupEmpty && <GroupList type="search" groups={groups} />}
          </GroupResultW>
          <ZaboResultW isGroupEmpty={isGroupEmpty}>
            <h1>자보 검색 결과</h1>
            <TagList type="search" onTagClick={onTagClick} clickedTags={safeCategory} />
            <div className="emptySpace"> </div>
            {!isZaboEmpty ? (
              <ZaboList type="search" key={safeQuery + safeCategory.join("")} />
            ) : (
              <Empty query={safeQuery} category={safeCategory} isZaboEmpty={isZaboEmpty} />
            )}
          </ZaboResultW>
        </Page.Body>
      )}
    </Page>
  );
};

SearchPage.propTypes = {};

export default SearchPage;
