import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { fromJS, Map } from 'immutable';

import axios from 'lib/axios';

const api = {
  fetchProfile: (name) => axios.get (`/profile/${name}`).then (res => res.data),
};

const GET_PROFILE = 'profile/GET_PROFILE';

export const getProfile = createAction (GET_PROFILE, api.fetchProfile, (...meta) => meta);

const initialState = Map ({
  profiles: Map ({}),
});

export default handleActions ({
  ...pender ({
    type: GET_PROFILE,
    onSuccess: (state, action) => {
      const profile = action.payload;
      const [name, clear] = action.meta;
      const added = state.setIn (['profiles', name], fromJS (profile));
      if (clear) return added.deleteIn (['profiles', clear]);
      return added;
    },
    onFailure: (state, action) => {
      const error = action.payload;
      return state.setIn (['profiles', action.meta], fromJS ({ error }));
    },
  }),
}, initialState);
