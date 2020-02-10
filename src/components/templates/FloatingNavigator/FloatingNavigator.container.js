import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import toJS from 'hoc/toJS';

import FloatingNavigator from './FloatingNavigator';

class FloatingNavigatorContainer extends PureComponent {
  render () {
    return <FloatingNavigator {...this.props} />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect (mapStateToProps, mapDispatchToProps) (toJS (FloatingNavigatorContainer));
