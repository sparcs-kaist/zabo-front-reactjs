import { connect } from 'react-redux';
import { List } from 'immutable';

import {
  getGroupZaboList, getPins, getSearchZaboList,
  getZaboList,
} from 'store/reducers/zabo';
import toJS from 'hoc/toJS';

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
  const zaboIdList = state.getIn (reduxKey[type] (query)) || emptyList;
  return {
    zaboIdList,
  };
};

const mapDispatchToProps = {
  getPins,
  getZaboList,
  getGroupZaboList,
  getSearchZaboList,
};

export default connect (mapStateToProps, mapDispatchToProps) (toJS (ZaboList));
