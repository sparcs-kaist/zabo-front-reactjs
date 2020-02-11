import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';

// import { searchAPI } from lib/api/search';
import TagList from 'atoms/TagList';
import GroupList from 'organisms/GroupList';
import Header from 'templates/Header';
import ZaboList from 'templates/ZaboList';

import { getSearch } from 'store/reducers/zabo';
import useSetState from 'hooks/useSetState';

import { Page, Zabos } from './SearchPage.styled';

const SearchPage = () => {
  const dispatch = useDispatch ();
  const { search } = window.location;
  const { query, category } = queryString.parse (search);
  // const [text, tags] = parseQuery (query);

  const [state, setState, onChange] = useSetState ({
    zaboSearch: [],
    uploaderSearch: [],
    keywordSearch: [],
    clickedTags: [],
  });
  const {
    zaboSearch, uploaderSearch, keywordSearch, clickedTags,
  } = state;
  const isZaboSearchEmpty = zaboSearch.length === 0;

  const _updateResults = data => {
    const { zabos, groups, categories } = data;
    setState ({
      zaboSearch: zabos,
      uploaderSearch: groups,
      keywordSearch: categories,
    });
  };

  useEffect (() => {
    dispatch (getSearch (search))
      .then (data => _updateResults (data))
      .catch (err => console.log (err));
  }, [search]);

  const onTagClick = e => {
    const { value } = e.target;
    setState (prevState => ({
      clickedTags: [...prevState.clickedTags, value],
    }));
  };

  return (
    <Page>
      <Header rightGroup={<Header.AuthButton />} scrollHeader />
      <Page.Body>
        <GroupList type="search" groups={uploaderSearch} />
        <Zabos>
          <h1>전체 검색 결과</h1>
          <TagList onTagClick={onTagClick} />
          <div style={{ marginTop: '28px' }}> </div>
          {!isZaboSearchEmpty && <ZaboList type="search" query={search} />}
        </Zabos>
      </Page.Body>
    </Page>
  );
};

SearchPage.propTypes = {
};

export default SearchPage;
