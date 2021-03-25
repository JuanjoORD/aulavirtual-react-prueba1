import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

import Swal from "sweetalert2"
import { getMe } from "../cuenta/login"

const TOTAL_PENDING_HOMEWORK = "TOTAL_PENDING_HOMEWORK"

//Funciones para cambiar contraseña

export const changeMyPassword = (data) => (dispatch, getStore) => {        
    console.log("DATA DE changeMyPassword:", data)    
    
    api.post(`/user/recover_password`, data).then(response => {
        NotificationManager.success('Contraseña recuperada correctamente, ya puede iniciar sesión', 'Éxito', 4000);        
        console.log("response recover_password:", response)
        dispatch(push("/login"))
    })
    .catch(error => {
        console.log('error recover_password:', error)
        if(error.detail){
            NotificationManager.error(error.detail, 'ERROR', 0);
        }
        else{
            NotificationManager.error('Error al intentar recuperar su contraseña', 'ERROR', 0);
        }        
    })
}

const verifyEmail = (data) => (dispatch, getStore) => {
    console.log("data Verify Email:", data)

    return api.post(`/user/check_email`, data).then(response => {
        NotificationManager.success('Correo confirmado, por favor revise su correo electronico', 'Éxito', 0);
        console.log("response verifyEmail:", response)        
        return true
    })
    .catch(error => {
        console.log('error verifyEmail:', error)
        if(error.detail){
            NotificationManager.error(error.detail, 'ERROR', 0);
        }
        else{
            NotificationManager.error('Error al intentar verificar correo electronico', 'ERROR', 0);
        }
        return false
    })
}



export const actions = {
    changeMyPassword,
    verifyEmail,
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