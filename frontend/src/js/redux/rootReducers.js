import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/login';

export default combineReducers({
    form: formReducer,
    login,
    routing,
});
