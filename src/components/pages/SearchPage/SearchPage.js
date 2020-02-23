import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';

// import { searchAPI } from lib/api/search';
import TagList from 'atoms/TagList';
import GroupList from 'organisms/GroupList';
import Header from 'templates/Header';
import ZaboList from 'templates/ZaboList';

import { getSearch } from 'store/reducers/zabo';
import useSetState from 'hooks/useSetState';
import { parseQuery } from 'lib/utils';

import searchIcon from 'static/images/search-icon-navy.png';

import {
  EmptyResultW, GroupResultW, Page, ZaboResultW,
} from './SearchPage.styled';

const Empty = ({ query, category }) => {
  let label = '\' \'';
  if (query) label = query;
  if (category.length) label += ' #'.concat (category);
  return (
    <EmptyResultW>
      <img className="search-icon" src={searchIcon} alt="search icon" />
      <div className="empty-text">
        <div className="empty-query">{label}</div>
        에 대한 검색결과가 없습니다.
      </div>
      <p>
        없었어요?<br />
        없어요<br />
        아 있었는데?<br />
        아니 없어요 그냥
      </p>
    </EmptyResultW>
  );
};
Empty.propTypes = {
  query: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

const initialState = {
  zabos: [],
  groups: [],
};

const SearchPage = () => {
  const dispatch = useDispatch ();
  const { search } = useLocation ();
  const history = useHistory ();
  const { safeQuery, safeCategory } = parseQuery (search);

  const [state, setState] = useSetState (initialState);
  const { zabos, groups } = state;

  const _updateResults = useCallback (data => {
    const { zabos, groups } = data;
    setState ({ zabos, groups });
  }, [setState]);

  useEffect (() => {
    dispatch (getSearch ({ query: safeQuery, category: safeCategory, stat: true }))
      .then (data => _updateResults (data))
      .catch (err => _updateResults (initialState));
  }, [safeQuery, safeCategory.join ('')]);

  const onTagClick = (newCat) => {
    let newCats = safeCategory.slice ();
    if (safeCategory.includes (newCat)) {
      newCats = newCats.filter (c => c !== newCat);
    } else {
      newCats.push (newCat);
    }
    const search = {};
    if (safeQuery) search.query = safeQuery;
    if (newCats.length) search.category = newCats;
    history.push (`/search?${queryString.stringify (search)}`);
  };

  return (
    <Page>
      <Header type="search" scrollHeader />
      <Page.Body>
        <GroupResultW>
          {groups.length
            ? <GroupList type="search" groups={groups} />
            : (
              <>
                <h1>그룹 검색 결과</h1>
                <Empty query={safeQuery} category={safeCategory} />
              </>
            )}
        </GroupResultW>
        <ZaboResultW>
          <h1>자보 검색 결과</h1>
          <TagList
            type="search"
            onTagClick={onTagClick}
            clickedTags={safeCategory}
          />
          <div className="emptySpace"> </div>
          {zabos.length
            ? <ZaboList type="search" key={safeQuery + safeCategory.join ('')} />
            : <Empty query={safeQuery} category={safeCategory} />}
        </ZaboResultW>
      </Page.Body>
    </Page>
  );
};

SearchPage.propTypes = {
};

export default SearchPage;
