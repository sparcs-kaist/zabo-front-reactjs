import { connect } from 'react-redux';
import { List } from 'immutable';
import get from 'lodash.get';

import {
  getGroupZaboList, getPins, getSearchZaboList,
  getZaboList,
} from 'store/reducers/zabo';

import ZaboList from './ZaboList';

const reduxKey = {
  main: () => ['zabo', 'lists', 'main'],
  related: id => ['zabo', 'lists', id],
  pins: () => ['zabo', 'lists', 'pins'],
  group: name => ['zabo', 'lists', name],
  search: () => ['zabo', 'lists', 'search'],
};
const emptyList = List ([]);
const mapStateToProps = (state, ownProps) => {
  const { type, query } = ownProps;
  const zaboIdList = get (state, reduxKey[type] (query)) || emptyList;
  return {
    zaboIdList,
    width: get (state, ['app', 'windowSize', 'width']),
  };
};

const mapDispatchToProps = {
  getPins,
  getZaboList,
  getGroupZaboList,
  getSearchZaboList,
};

export default connect (mapStateToProps, mapDispatchToProps) (ZaboList);
