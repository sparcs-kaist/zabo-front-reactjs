import { createSelector } from 'reselect';
import { CHECK_AUTH } from '../../store/reducers/auth';

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
