import produce from 'immer';
import { handleActions } from 'redux-actions';

const initialState = {
  current: null,
  today: {
    evening: null,
    afternoon: null,
    night: null,
  },
};

export const SET_CURRENT = 'weather/SET_CURRENT';
export const SET_TODAY = 'weather/SET_TODAY';
export const SET_EVENING = 'weather/SET_EVENING';
export const SET_AFTERNOON = 'weather/SET_AFTERNOON';
export const SET_NIGHT = 'weather/SET_NIGHT';

export const setCurrent = (weather) => {
  return {
    type: SET_CURRENT,
    payload: weather,
  };
};

export const setToday = (weather) => {
  return {
    type: SET_TODAY,
    payload: weather,
  };
};

export const setEvening = (weather) => {
  return {
    type: SET_EVENING,
    payload: weather,
  };
};

export const setAfternoon = (weather) => {
  return {
    type: SET_AFTERNOON,
    payload: weather,
  };
};

export const setNight = (weather) => {
  return {
    type: SET_NIGHT,
    payload: weather,
  };
};

export default handleActions({
  [SET_CURRENT]: (state, { payload }) => {
    return produce(state, (draft) => {
      draft.current = payload;
      return draft;
    });
  },
  [SET_TODAY]: (state, { payload }) => {
    return produce(state, (draft) => {
      draft.today.afternoon = payload.afternoon;
      draft.today.evening = payload.evening;
      draft.today.night = payload.night;
      return draft;
    });
  },
  [SET_AFTERNOON]: (state, { payload }) => {
    return produce(state, (draft) => {
      draft.today.afternoon = payload;
      return draft;
    });
  },
  [SET_EVENING]: (state, { payload }) => {
    return produce(state, (draft) => {
      draft.today.evening = payload;
      return draft;
    });
  },
  [SET_NIGHT]: (state, { payload }) => {
    return produce(state, (draft) => {
      draft.today.night = payload;
      return draft;
    });
  },
}, initialState);