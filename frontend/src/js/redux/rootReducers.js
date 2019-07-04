import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import usuarios from './modules/usuarios/usuarios';

export default combineReducers({
    form: formReducer,
    login,
    register,
    usuarios,
    routing,
});
