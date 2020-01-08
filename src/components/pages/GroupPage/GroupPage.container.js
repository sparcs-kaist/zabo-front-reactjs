import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import toJS from 'hoc/toJS';
import { isAuthenticated } from 'lib/utils';
import GroupPage from './GroupPage';

import { removeGroupUser } from '../../../store/reducers/auth';


class GroupPageContainer extends PureComponent {
  render () {
    return <GroupPage {...this.props} />;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated (state),
  info: state.getIn (['auth', 'info']),
});

const mapDispatchToProps = {
  removeGroupUser,
};

export default connect (mapStateToProps, mapDispatchToProps) (toJS (GroupPageContainer));
