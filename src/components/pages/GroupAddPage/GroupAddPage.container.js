import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import toJS from 'hoc/toJS';
import GroupAddPage from './GroupAddPage';

class GroupAddPageContainer extends PureComponent {
  render () {
    return <GroupAddPage {...this.props} />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect (mapStateToProps, mapDispatchToProps) (toJS (GroupAddPageContainer));
