import { handleActions } from 'redux-actions';
import { produce } from 'immer';

const initialState = {
  time: new Date(),
};

export const SET = 'time/SET';

export const set = (time) => {
  return {
    type: SET,
    payload: time,
  };
};

export default handleActions({
  [SET]: (state, { payload }) => {
    return produce(state, (draft) => {
      draft.time = payload;
      return draft;
    });
  },
}, initialState);
