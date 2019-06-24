import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SUBMIT = 'SUBMIT';
const LOADER = 'LOGIN_LOADER';

export const constants = {
    SUBMIT,
};

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
    type: LOADER,
    loader,
});

// ------------------------------------
// Actions
// ------------------------------------

export const onSubmit = (data = {}) => (dispatch) => {
    setLoader(true);
    api.post('user', data).then(() => {
        dispatch(push("/login"));
        NotificationManager.success('Cuenta creada con éxito, puedes iniciar sesión', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
    }).finally(() => {
        dispatch({ type: LOADER, loader: false });
    });
};

export const logOut = () => (dispatch) => {
    localStorage.removeItem('token');
};


export const actions = {
    onSubmit,
    logOut,
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
};

export const initialState = {
    loader: false,
};

export default handleActions(reducers, initialState);
