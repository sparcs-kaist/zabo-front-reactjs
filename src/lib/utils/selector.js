import { createSelector } from 'reselect';

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

export const selectAuthenticated = createSelector (decodedTokenSelector, isDecodedTokenAlive);
export const tokenTimeLeft = createSelector (decodedTokenSelector, decodedTokenLifetime);
export const selectIsAdmin = state => state.getIn (['auth', 'info', 'isAdmin']);
