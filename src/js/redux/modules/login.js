import { createAction, handleActions } from 'redux-actions';

const INITIAL = 'INITIAL';
const SUBMIT = 'SUBMIT';
const NAME_ERROR = 'NAME_ERROR';
const PASS_ERROR = 'PASS_ERROR';
const LOGIN_LOADER = 'LOGIN_LOADER';
const SUBMIT_ERROR = 'SUBMIT_ERROR';

export const constants = {
    SUBMIT,
};

// ------------------------------------
// Actions
// ------------------------------------
/* Funcion para simular el login, ELIMINAR */
function logInMock(dispatch) {
    localStorage.setItem('token', '123');
    dispatch({ type: LOGIN_LOADER, loader: false });
    dispatch({ type: SUBMIT, autenticado: true });
}

export const onSubmit = (data = {}) => (dispatch, getStore) => {
    let canLog = true;
    dispatch({ type: LOGIN_LOADER, loader: true });
    dispatch({ type: SUBMIT_ERROR, submitError: false });

    if (canLog) {
        // Esto debiera hacer una peticion a un API
        setTimeout(logInMock, 2000, dispatch);
    } else {
        dispatch({ type: LOGIN_LOADER, loader: false });
        dispatch({ type: SUBMIT, autenticado: false });
    }
};

export const logOut = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: SUBMIT, autenticado: false });
};

export const initialLoad = createAction(INITIAL);
export const hasNameError = nameError => ({
    type: NAME_ERROR,
    nameError,
});
export const hasPassError = passError => ({
    type: PASS_ERROR,
    passError,
});

export const actions = {
    initialLoad,
    hasNameError,
    hasPassError,
    onSubmit,
    logOut,
};

export const reducers = {
    [INITIAL]: (state) => {
        const token = localStorage.getItem('token');
        if (token) {
            return {
                ...state,
                redirect: true,
            };
        }
        return {
            ...state,
            redirect: false,
        };
    },
    [SUBMIT]: (state, { autenticado }) => {
        return {
            ...state,
            autenticado,
        };
    },
    [NAME_ERROR]: (state, { nameError }) => {
        return {
            ...state,
            nameError,
        };
    },
    [PASS_ERROR]: (state, { passError }) => {
        return {
            ...state,
            passError,
        };
    },
    [LOGIN_LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [SUBMIT_ERROR]: (state, { submitError }) => {
        return {
            ...state,
            submitError,
        };
    },
};

export const initialState = {
    submitError: false,
    passError: false,
    nameError: false,
    autenticado: false,
    loader: false,
};

export default handleActions(reducers, initialState);
