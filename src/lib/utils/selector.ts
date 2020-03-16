import { get } from 'lodash';
import { createSelector, ParametricSelector, Selector } from 'reselect';
import {
  IGroup, IJwt, IUser, IZabo, IZaboMap,
} from 'types/index.d';
import { IState } from 'types/store.d';

import { CHECK_AUTH } from 'store/reducers/auth';

const decodedTokenSelector : Selector<IState, IJwt> = (state : IState) => get (state, ['auth', 'jwt']);
const isDecodedTokenAlive = (decoded : IJwt) => {
  if (decoded && decoded.exp) {
    return 1000 * decoded.exp - new Date ().getTime () >= 5000;
  }
  return false;
};
const decodedTokenLifetime = (decoded : IJwt) : number => {
  if (decoded && decoded.exp) {
    const remain = decoded.exp * 1000 - Date.now ();
    return remain > 0 ? remain : 0;
  }
  return 0;
};

export const isAuthedSelector = createSelector (decodedTokenSelector, isDecodedTokenAlive);
export const tokenTimeLeft = createSelector (decodedTokenSelector, decodedTokenLifetime);

export const isAdminSelector = (state : IState) => get (state, ['auth', 'info', 'isAdmin']);
export const authPendingSelector = (state : IState) => state.pender.pending[CHECK_AUTH];
export const isAdminOrPendingSelector = (state : IState) => [isAdminSelector (state), authPendingSelector (state)];

const zabosSelector : ParametricSelector<IState, string[], [IZaboMap, string[]]> = (state : IState, zaboIds : string[]) : [IZaboMap, string[]] => [get (state, ['zabo', 'zabos']), zaboIds];
const zabosComputer = ([zabos, zaboIds] : [IZaboMap, string[]]) => zaboIds.map ((id : string) => zabos[id]);

// TODO: Factory function (due to cache size of 1)
export const zaboListFromIdsSelector = createSelector (zabosSelector, zabosComputer);

const zaboSelector = (state : IState, zaboId : string) => get (state, ['zabo', 'zabos', zaboId]);
const ownGroupsSelector = (state : IState) => get (state, ['auth', 'info', 'groups']);
const isMyZabo = (zabo : IZabo, groups : IGroup[]) => !!groups.find ((group : IGroup) => zabo && group._id === get (zabo, ['owner', '_id']));
export const isMyZaboSelector = createSelector ([zaboSelector, ownGroupsSelector], isMyZabo);
