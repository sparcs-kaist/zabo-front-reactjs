import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { fromJS, Map } from 'immutable';

import axios from 'lib/axios';

const api = {
  fetchProfile: (name) => axios.get (`/profile/${name}`),
};

const GET_PROFILE = 'profile/GET_PROFILE';

export const getProfile = createAction (GET_PROFILE, api.fetchProfile, meta => meta);

const initialState = Map ({
  profiles: Map ({}),
});

export default handleActions ({
  ...pender ({
    type: GET_PROFILE,
    onSuccess: (state, action) => {
      const profile = action.payload;
      const name = action.meta;
      return state.setIn (['profiles', name], fromJS (profile));
    },
    onFailure: (state, action) => {
      const error = action.payload;
      const name = action.meta;
      return state.setIn (['profiles', name], fromJS (error));
    },
  }),
}, initialState);
