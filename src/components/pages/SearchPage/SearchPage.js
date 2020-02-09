import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { searchAPI } from '../../../lib/api/search';
import { Page } from './SearchPage.styled';
import Header from '../../templates/Header';
import GroupList from '../../organisms/GroupList';
import useSetState from '../../../hooks/useSetState';

const SearchPage = () => {
  const { search } = window.location;
  const { query } = queryString.parse (search);
  const [state, setState, onChange] = useSetState ({
    zaboSearch: [],
    uploaderSearch: [],
    keywordSearch: [],
  });
  const { zaboSearch, uploaderSearch, keywordSearch } = state;

  const _updateResults = data => {
    const { zabos, groups, categories } = data;
    setState ({
      zaboSearch: zabos,
      uploaderSearch: groups,
      keywordSearch: categories,
    });
  };

  useEffect (() => {
    searchAPI (query)
      .then (data => _updateResults (data))
      .catch (err => console.log (err));
  }, []);

  return (
    <Page>
      <Header rightGroup={<Header.AuthButton />} scrollHeader />
      <Page.Body>
        <GroupList type="search" groups={uploaderSearch} />
      </Page.Body>
    </Page>
  );
};

SearchPage.propTypes = {
};

export default SearchPage;
