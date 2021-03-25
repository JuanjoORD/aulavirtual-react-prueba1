import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LIST_ROLES = 'LIST_ROLES'
const READ_ROLE = 'READ_ROLE' 

export const readRole = (id) => (dispatch) => {
    api.get(`/role/${id}`).then(response => {
        console.log('role response:', response)
        dispatch({type: READ_ROLE, oneData: response})
        dispatch(initializeForm('single_form', response))
    })
    .catch(error => {
        console.log('error profesion:', error)
        NotificationManager.error('Error al leer el rol', 'ERROR', 0);
    })
}

export const listRole = () => (dispatch) => {
    api.get('/role').then(response => {
        console.log('role list', response)
        dispatch({type: LIST_ROLES, data: response})
    })
    .catch(error => {
        console.log('error profesion:', error)
        NotificationManager.error('Error al listar roles', 'ERROR', 0);
    })
}

export const registerRole = () => (dispatch, getStore) => {    
    const data = getStore().form.single_form.values    

    api.post('/role', data).then(response => {
        NotificationManager.success('Rol creado exitosamente', 'Éxito', 3000);
        dispatch(push('/role'))
    })
    .catch(error => {
        console.log('error role:', error)
        NotificationManager.error('Error al registrar rol', 'ERROR', 0);
    })
}

export const updateRole = () => (dispatch, getStore) => {
    //console.log("getStohre:", getStore())
    const data = getStore().form.single_form.values   
    const id = data.id 

    api.put(`/role/${id}`, data).then(response => {
        NotificationManager.success('Rol actualizado exitosamente', 'Éxito', 3000);
        dispatch(push('/role'))
    })
    .catch(error => {
        console.log('error rol:', error)
        NotificationManager.error('Error al actualizar rol', 'ERROR', 0);
    })
}

export const deleteRole = (id) => (dispatch) => {
    console.log('delete rol', id)
    
    api.eliminar(`/role/${id}`).then(response => {
        NotificationManager.success('Rol eliminado exitosamente', 'Éxito', 3000);
        dispatch(listRole())
    })
    .catch(error => {
        console.log('error rol:', error)
        NotificationManager.error('Error al eliminar rol', 'ERROR', 0);
    })
}

export const actions = {
    registerRole,
    listRole,
    readRole,
    updateRole,
    deleteRole
};

export const initialState = {
    loader: false,
    data: null,
    oneData: null   
};

export const reducers = {
    [LIST_ROLES]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [READ_ROLE]: (state, { oneData }) => {
        return {
            ...state,
            oneData,
        };
    },
};

export default handleActions(reducers, initialState);