import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';

// import { searchAPI } from lib/api/search';
import { getSearch } from 'store/reducers/zabo';
import Header from 'templates/Header';
import GroupList from 'organisms/GroupList';
import TagList from 'atoms/TagList';
import ZaboList from 'templates/ZaboList';
import useSetState from 'hooks/useSetState';
import { Page, Zabos } from './SearchPage.styled';

const SearchPage = () => {
  const dispatch = useDispatch ();
  const { search } = window.location;
  const { query } = queryString.parse (search);
  const [state, setState, onChange] = useSetState ({
    zaboSearch: [],
    uploaderSearch: [],
    keywordSearch: [],
  });
  const { zaboSearch, uploaderSearch, keywordSearch } = state;
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
    dispatch (getSearch (query))
      .then (data => _updateResults (data))
      .catch (err => console.log (err));
  }, [query]);

  const onTagClick = () => {
    // console.log('tag clicked');
  };

  return (
    <Page>
      <Header rightGroup={<Header.AuthButton />} scrollHeader />
      <Page.Body>
        <GroupList type="search" groups={uploaderSearch} />
        <Zabos>
          <h1>전체 검색 결과</h1>
          <TagList onClick={onTagClick} />
          {!isZaboSearchEmpty && <ZaboList type="search" query={query} />}
        </Zabos>
      </Page.Body>
    </Page>
  );
};

SearchPage.propTypes = {
};

export default SearchPage;
