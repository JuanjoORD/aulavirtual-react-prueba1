import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LIST_PROFESSIONS = 'LIST_PROFESSIONS'
const READ_PROFESSION = 'READ_PROFESSION' 

export const readProfession = (id) => (dispatch) => {
    api.get(`/profession/${id}`).then(response => {
        console.log('read response:', response)
        dispatch({type: READ_PROFESSION, oneData: response})
        dispatch(initializeForm('single_form', response))
    })
    .catch(error => {
        console.log('error profesion:', error)
        NotificationManager.error('Error al leer la profesión', 'ERROR', 0);
    })
}

export const listProfession = () => (dispatch) => {
    api.get('/profession').then(response => {
        console.log('profession list', response)
        dispatch({type: LIST_PROFESSIONS, data: response})
    })
    .catch(error => {
        console.log('error profesion:', error)
        NotificationManager.error('Error al listar profesiones', 'ERROR', 0);
    })
}

export const registerProfession = () => (dispatch, getStore) => {    
    const data = getStore().form.single_form.values    

    api.post('/profession', data).then(response => {
        NotificationManager.success('Profesión creada exitosamente', 'Éxito', 3000);
        dispatch(push('/profession'))
    })
    .catch(error => {
        console.log('error profesion:', error)
        NotificationManager.error('Error al registrar profesión', 'ERROR', 0);
    })
}

export const updateProfession = () => (dispatch, getStore) => {
    //console.log("getStohre:", getStore())
    const data = getStore().form.single_form.values   
    const id = data.id 

    api.put(`/profession/${id}`, data).then(response => {
        NotificationManager.success('Profesión actualizada exitosamente', 'Éxito', 3000);
        dispatch(push('/profession'))
    })
    .catch(error => {
        console.log('error profesion:', error)
        NotificationManager.error('Error al actualizar profesión', 'ERROR', 0);
    })
}

export const deleteProfession = (id) => (dispatch) => {
    console.log('delete profession', id)
    
    api.eliminar(`/profession/${id}`).then(response => {
        NotificationManager.success('Profesión eliminada exitosamente', 'Éxito', 3000);
        dispatch(listProfession())
    })
    .catch(error => {
        console.log('error profesion:', error)
        NotificationManager.error('Error al eliminar profesión', 'ERROR', 0);
    })
}

export const actions = {
    registerProfession,
    listProfession,
    readProfession,
    updateProfession,
    deleteProfession
};

export const initialState = {
    loader: false,
    data: null,
    oneData: null   
};

export const reducers = {
    [LIST_PROFESSIONS]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [READ_PROFESSION]: (state, { oneData }) => {
        return {
            ...state,
            oneData,
        };
    },
};

export default handleActions(reducers, initialState);