import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

const SearchPage = () => {
  const { search } = window.location;
  const query = queryString.parse (search);

  return (
    <div>
      열심히 개발중입니다 :)
    </div>
  );
};

SearchPage.propTypes = {
};

export default SearchPage;
