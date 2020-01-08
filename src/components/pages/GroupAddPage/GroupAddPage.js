import React, { PureComponent } from 'react';

import SearchBar from 'templates/SearchBar';
import GroupAddPageWrapper from './GroupAddPage.styled';


class GroupAddPage extends PureComponent {
  render () {
    return (
      <GroupAddPageWrapper>
        <SearchBar />
      </GroupAddPageWrapper>
    );
  }
}

GroupAddPage.propTypes = {};

GroupAddPage.defaultProps = {};

export default GroupAddPage;
