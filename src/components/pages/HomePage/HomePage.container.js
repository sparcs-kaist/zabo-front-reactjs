import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';

import { getZaboList } from 'store/reducers/zabo';

import HomePage from './HomePage';

// deliver states(Redux) as props to the HomePage component
class HomePageContainer extends PureComponent {
  render () {
    return <HomePage {...this.props} />;
  }
}

// Subscribe to the Redux "state"
const mapStateToProps = state => ({
  zaboList: get (state, ['zabo', 'zaboList']),
});

// HomePage 에서 변경 사항이 생긴다면 널리 알려라.
const mapDispatchToProps = {
  getZaboList,
};

// index.js 가 HomePage 를 import 하는 것이 아닌, HomePage
export default connect (mapStateToProps, mapDispatchToProps) (HomePageContainer);
