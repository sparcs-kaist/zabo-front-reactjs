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

import searchIcon from 'static/images/search-icon-navy.png';

import { Page, Zabos } from './SearchPage.styled';

const SearchPage = () => {
  const dispatch = useDispatch ();
  const { search } = window.location;
  const { query, category } = queryString.parse (search);
  // const [text, tags] = parseQuery (query);

  const [state, setState, onChange] = useSetState ({
    zaboSearch: [],
    uploaderSearch: [],
    clickedTags: [],
  });
  const {
    zaboSearch, uploaderSearch, clickedTags,
  } = state;
  const isZaboSearchEmpty = zaboSearch.length === 0;
  const isResultsEmpty = isZaboSearchEmpty && uploaderSearch.length === 0;

  const _updateResults = data => {
    const { zabos, groups } = data;
    setState ({
      zaboSearch: zabos,
      uploaderSearch: groups,
    });
  };

  useEffect (() => {
    setState ({ clickedTags: [category] });
  }, [category]);

  useEffect (() => {
    // to get new updated category list
    dispatch (getSearch ({ query, category: clickedTags }))
      .then (data => _updateResults (data))
      .catch (err => console.log (err));
  }, [query, clickedTags]);

  const onTagClick = (category) => {
    if (clickedTags.includes (category)) {
      setState (prevState => ({
        clickedTags: prevState.clickedTags.filter (c => c !== category),
      }));
    } else {
      setState (prevState => ({
        clickedTags: [...prevState.clickedTags, category],
      }));
    }
  };

  return (
    <Page>
      <Header rightGroup={<Header.AuthButton />} scrollHeader />
      <Page.Body>
        {isResultsEmpty
          ? (
            <div className="empty-page">
              <img src={searchIcon} alt="search icon" />
              <div className="empty-text">
                <div className="empty-query">{query || '#'.concat (category)}</div>
                에 대한 검색결과가 없습니다.
              </div>
              <p>
                없었어요?<br />
                없어요<br />
                아 있었는데?<br />
                아니 없어요 그냥
              </p>
            </div>
          ) : (
            <div>
              <GroupList type="search" groups={uploaderSearch} />
              <Zabos>
                <h1>자보 검색 결과</h1>
                <TagList
                  type="search"
                  onTagClick={onTagClick}
                  clickedTags={clickedTags}
                />
                <div className="emptySpace"> </div>
                {!isZaboSearchEmpty && <ZaboList type="search" />}
              </Zabos>
            </div>
          )}
      </Page.Body>
    </Page>
  );
};

SearchPage.propTypes = {
};

export default SearchPage;
