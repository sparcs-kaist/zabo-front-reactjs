import { createSelector } from 'reselect';

import { CHECK_AUTH } from 'store/reducers/auth';

const decodedTokenSelector = state => state.getIn (['auth', 'jwt']);
const isDecodedTokenAlive = decoded => {
  if (decoded && decoded.get ('exp')) {
    return 1000 * decoded.get ('exp') - new Date ().getTime () >= 5000;
  }
  return false;
};
const decodedTokenLifetime = decoded => {
  if (decoded && decoded.get ('exp')) {
    const remain = decoded.get ('exp') * 1000 - Date.now ();
    return remain > 0 ? remain : 0;
  }
  return 0;
};

export const isAuthedSelector = createSelector (decodedTokenSelector, isDecodedTokenAlive);
export const tokenTimeLeft = createSelector (decodedTokenSelector, decodedTokenLifetime);

export const isAdminSelector = state => state.getIn (['auth', 'info', 'isAdmin']);
export const authPendingSelector = state => state.get ('pender').pending[CHECK_AUTH];
export const isAdminOrPendingSelector = state => [isAdminSelector (state), authPendingSelector (state)];

const zabosSelector = (state, zaboIds) => [state.getIn (['zabo', 'zabos']), zaboIds];
const zabosComputer = ([zabos, zaboIds]) => zaboIds.map (id => zabos.get (id));

// TODO: Factory function (due to cache size of 1)
export const zaboListFromIdsSelector = createSelector (zabosSelector, zabosComputer);

const zaboSelector = (state, zaboId) => state.getIn (['zabo', 'zabos', zaboId]);
const ownGroupsSelector = (state) => state.getIn (['auth', 'info', 'groups']);
const isMyZabo = (zabo, groups) => !!groups.find (group => zabo && group.get ('_id') === zabo.getIn (['owner', '_id']));
export const isMyZaboSelector = createSelector ([zaboSelector, ownGroupsSelector], isMyZabo);
