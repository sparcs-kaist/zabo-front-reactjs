import { List } from 'immutable';
import { connect } from 'react-redux';

import toJS from 'hoc/toJS';
import { getPins, getZaboList, getGroupZaboList } from 'store/reducers/zabo';

import ZaboList from './ZaboList';
import { zaboListFromIdsSelector } from '../../../lib/utils';

const reduxKey = {
  main: () => ['zabo', 'lists', 'main'],
  related: id => ['zabo', 'lists', id],
  pins: () => ['zabo', 'lists', 'pins'],
  group: name => ['zabo', 'lists', name],
};

const emptyList = List ([]);
const mapStateToProps = (state, ownProps) => {
  const { type, query } = ownProps;
  const zaboIdList = state.getIn (reduxKey[type] (query)) || emptyList;
  return {
    zaboIdList,
    zabos: zaboListFromIdsSelector (state, zaboIdList),
  };
};

const mapDispatchToProps = {
  getPins,
  getZaboList,
  getGroupZaboList,
};

export default connect (mapStateToProps, mapDispatchToProps) (toJS (ZaboList));
