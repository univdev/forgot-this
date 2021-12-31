import produce from 'immer';
import { handleActions } from 'redux-actions';

const initialState = {
  longitude: 0,
  latitude: 0,
  area: null,
};

export const SET = 'coordinates/SET';
export const SET_LATITUDE = 'coordinates/SET_LATITUDE';
export const SET_LONGITUDE = 'coordinates/SET_LONGITUDE';
export const SET_AREA = 'coordinates/SET_AREA';

export const setCoordinates = (lat, lng) => {
  return {
    type: SET,
    payload: { lat, lng },
  };
};

export const setLatitude = (lat) => {
  return {
    type: SET_LATITUDE,
    payload: lat,
  };
};

export const setLongitude = (lng) => {
  return {
    type: SET_LONGITUDE,
    payload: lng,
  };
};

export const setArea = (area) => {
  return {
    type: SET_AREA,
    payload: area,
  };
};

export default handleActions({
  [SET]: (state, { payload }) => {
    return produce(state, (draft) => {
      draft.latitude = payload.lat || 0,
      draft.longitude = payload.lng || 0;
      return draft;
    });
  },
  [SET_LATITUDE]: (state, { payload }) => {
    return produce(state, (draft) => {
      draft.latitude = payload;
      return draft;
    });
  },
  [SET_LONGITUDE]: (state, { payload }) => {
    return produce(state, (draft) => {
      draft.longitude = payload;
      return draft;
    });
  },
  [SET_AREA]: (state, { payload }) => {
    return produce(state, (draft) => {
      draft.area = payload;
      return draft;
    });
  },
}, initialState);
