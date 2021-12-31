import { combineReducers } from 'redux';
import coordinates from './coordinates';
import time from './time';

export default combineReducers({
  coordinates,
  time,
});