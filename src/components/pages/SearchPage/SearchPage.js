import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { searchAPI } from '../../../lib/api/search';
import Header from '../../templates/Header';
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
    const data = searchAPI (query);
    _updateResults (data);
  }, []);

  return (
    <div>
      <Header rightGroup={<Header.AuthButton />} scrollHeader />
      <h1>그룹 검색 결과</h1>
      {/* <Groups>
        <h1>그룹 검색 결과</h1>
        <Groups.ScrollBtn>
        </Groups.ScrollBtn>
        <Groups.List id="groupsList">
        </Groups.List>
      </Groups> */}
    </div>
  );
};

SearchPage.propTypes = {
};

export default SearchPage;
