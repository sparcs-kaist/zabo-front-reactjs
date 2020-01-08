import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { connect } from 'react-redux';

import toJS from 'hoc/toJS';
import { listTypes } from 'lib/variables';
import { getPins, getZaboList } from 'store/reducers/zabo';

import ZaboList from './ZaboList';

const reduxKey = {
  main: () => ['zabo', 'lists', 'main'],
  related: id => ['zabo', 'lists', id],
  pins: () => ['zabo', 'lists', 'pins'],
};

class ZaboListContainer extends PureComponent {
  render () {
    return <ZaboList {...this.props} />;
  }
}

ZaboListContainer.propTypes = {
  ...ZaboList.propTypes,
  type: PropTypes.oneOf (listTypes),
};

ZaboListContainer.defaultProps = {
  ...ZaboList.defaultProps,
  type: 'main',
};

const emptyList = List ([]);
const mapStateToProps = (state, ownProps) => {
  const { type, relatedTo } = ownProps;
  return {
    zaboList: state.getIn (reduxKey[type] (relatedTo)) || emptyList,
  };
};

const mapDispatchToProps = {
  getPins,
  getZaboList,
};

export default connect (mapStateToProps, mapDispatchToProps) (toJS (ZaboListContainer));
