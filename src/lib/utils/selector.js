import get from 'lodash.get';
import { createSelector } from 'reselect';

import { CHECK_AUTH } from 'store/reducers/auth';

const decodedTokenSelector = state => get (state, ['auth', 'jwt']);
const isDecodedTokenAlive = decoded => {
  if (decoded && decoded.exp) {
    return 1000 * decoded.exp - new Date ().getTime () >= 5000;
  }
  return false;
};
const decodedTokenLifetime = decoded => {
  if (decoded && decoded.exp) {
    const remain = decoded.exp * 1000 - Date.now ();
    return remain > 0 ? remain : 0;
  }
  return 0;
};

export const isAuthedSelector = createSelector (decodedTokenSelector, isDecodedTokenAlive);
export const tokenTimeLeft = createSelector (decodedTokenSelector, decodedTokenLifetime);

export const isAdminSelector = state => get (state, ['auth', 'info', 'isAdmin']);
export const authPendingSelector = state => state.pender.pending[CHECK_AUTH];
export const isAdminOrPendingSelector = state => [isAdminSelector (state), authPendingSelector (state)];

const zabosSelector = (state, zaboIds) => [get (state, ['zabo', 'zabos']), zaboIds];
const zabosComputer = ([zabos, zaboIds]) => zaboIds.map (id => zabos.get (id));

// TODO: Factory function (due to cache size of 1)
export const zaboListFromIdsSelector = createSelector (zabosSelector, zabosComputer);

const zaboSelector = (state, zaboId) => get (state, ['zabo', 'zabos', zaboId]);
const ownGroupsSelector = (state) => get (state, ['auth', 'info', 'groups']);
const isMyZabo = (zabo, groups) => !!groups.find (group => zabo && group._id === get (zabo, ['owner', '_id']));
export const isMyZaboSelector = createSelector ([zaboSelector, ownGroupsSelector], isMyZabo);
