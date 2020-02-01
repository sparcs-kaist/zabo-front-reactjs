import React, { PureComponent } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';

import toJS from 'hoc/toJS';
import { getPins, getZaboList, getGroupZaboList } from 'store/reducers/zabo';

import ZaboList from './ZaboList';

const reduxKey = {
  main: () => ['zabo', 'lists', 'main'],
  related: id => ['zabo', 'lists', id],
  pins: () => ['zabo', 'lists', 'pins'],
  group: name => ['zabo', 'lists', name],
};

class ZaboListContainer extends PureComponent {
  render () {
    return <ZaboList {...this.props} />;
  }
}

ZaboListContainer.propTypes = {
  ...ZaboList.propTypes,
};

ZaboListContainer.defaultProps = {
  ...ZaboList.defaultProps,
};

const emptyList = List ([]);
const mapStateToProps = (state, ownProps) => {
  const { type, query } = ownProps;
  const zaboIdList = state.getIn (reduxKey[type] (query)) || emptyList;
  return {
    zaboIdList,
  };
};

const mapDispatchToProps = {
  getPins,
  getZaboList,
  getGroupZaboList,
};

export default connect (mapStateToProps, mapDispatchToProps) (toJS (ZaboListContainer));
