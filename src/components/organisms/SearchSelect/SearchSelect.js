import React, { useCallback } from 'react';

import Select from 'molecules/Select';

const SearchSelect = ({ ...props }) => (
  <Select
    async
    {...props}
  />
);

SearchSelect.propTypes = {
  ...Select.propTypes,
};

SearchSelect.defaultProps = {

};

export default SearchSelect;
