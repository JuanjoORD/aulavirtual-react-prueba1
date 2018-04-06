import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import login from './modules/login';

export default combineReducers({
  login,
  routing,
});
