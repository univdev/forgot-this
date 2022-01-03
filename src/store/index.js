import { combineReducers } from 'redux';
import coordinates from './coordinates';
import time from './time';
import weather from './weather';

export default combineReducers({
  coordinates,
  time,
  weather,
});