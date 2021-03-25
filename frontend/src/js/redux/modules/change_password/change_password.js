import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

import Swal from "sweetalert2"
import { getMe } from "../cuenta/login"

const TOTAL_PENDING_HOMEWORK = "TOTAL_PENDING_HOMEWORK"

//Funciones para cambiar contraseña

export const changeMyPassword = () => (dispatch, getStore) => {
    const user = getStore().login.me
    const data = getStore().form.form_password.values

    return api.post(`/user/change_password`, data).then(response => {
        NotificationManager.success('Contraseña cambiada correctamente', 'Éxito', 4000);        
        console.log("CHANGE PASS:", response)        
        return true
    })
    .catch(error => {
        console.log('error CHANGE PASS:', error)
        NotificationManager.error('Error al intentar cambiar contraseña', 'ERROR', 0);
        return false
    })
}

const verifyPasswordChanged = () => (dispatch, getStore) => {
    const user = getStore().login.me
    const hasProfile = user.profile ? true : false

    if(hasProfile){
        if(!user.profile.password_changed)
            Swal.fire({
                type: 'info',
                title: 'Espere',
                text: 'Primero debe cambiar su contraseña'
            })
    }
}



export const actions = {
    changeMyPassword,
    verifyPasswordChanged,
    getMe
};

export const initialState = {
    loader: false,
    pendingHomeworkData: null,
};

export const reducers = {    
    [TOTAL_PENDING_HOMEWORK]: (state, { pendingHomeworkData }) => {
        return {
            ...state,
            pendingHomeworkData,
        };
    },    
};

export default handleActions(reducers, initialState);