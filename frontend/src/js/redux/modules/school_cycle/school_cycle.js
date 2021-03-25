import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LIST_CYCLE = 'LIST_CYCLE'
const READ_CYCLE = 'READ_CYCLE'

const principalEndPoint = '/school_cycle'

export const readCycle = (id) => (dispatch) => {
    api.get(`${principalEndPoint}/${id}`).then(response => {
        console.log('cycle read response:', response)
        dispatch({type: READ_CYCLE, oneData: response})
        dispatch(initializeForm('single_form', response))
    })
    .catch(error => {
        console.log('error read cycle:', error)
        NotificationManager.error('Error al leer ciclo escolar', 'ERROR', 0);
    })
}

export const listCycle = () => (dispatch) => {
    api.get(principalEndPoint).then(response => {
        console.log('list cycle response', response)
        dispatch({type: LIST_CYCLE, data: response})
        dispatch({type: READ_CYCLE, oneData: null})
    })
    .catch(error => {
        console.log('error list cycle:', error)
        NotificationManager.error('Error al listar los ciclos escolares', 'ERROR', 0);
    })
}

export const registerCycle = () => (dispatch, getStore) => {    
    const data = getStore().form.single_form.values    
    
    api.post(principalEndPoint, data).then(response => {
        NotificationManager.success('Grado creado exitosamente', 'Éxito', 3000);
        dispatch(push(principalEndPoint))
    })
    .catch(error => {
        console.log('error register grade :', error)
        NotificationManager.error('Error al registrar grado', 'ERROR', 0);
    })
}

export const updateCycle = () => (dispatch, getStore) => {    
    const data = getStore().form.single_form.values
    console.log("update cycle", data)
    const id = data.id 

    api.put(`${principalEndPoint}/${id}`, data).then(response => {
        NotificationManager.success('Ciclo escolar actualizado exitosamente', 'Éxito', 3000);
        dispatch(push(principalEndPoint))
    })
    .catch(error => {
        console.log('error update cycle:', error)
        NotificationManager.error('Error al actualizar ciclo escolar', 'ERROR', 0);
    })
}

export const deleteCycle = (id) => (dispatch) => {
    console.log('delete cycle', id)
    
    api.eliminar(`${principalEndPoint}/${id}`).then(response => {
        NotificationManager.success('Ciclo escolar eliminado exitosamente', 'Éxito', 3000);
        dispatch(listCycle())
    })
    .catch(error => {
        console.log('error delete cycle:', error)
        NotificationManager.error('Error al eliminar ciclo escolar', 'ERROR', 0);
    })
}




export const actions = {
    readCycle,
    listCycle,
    registerCycle,
    updateCycle,
    deleteCycle
};

export const initialState = {
    loader: false,
    data: null,
    oneData: null,    
};

export const reducers = {    
    [LIST_CYCLE]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [READ_CYCLE]: (state, { oneData }) => {
        return {
            ...state,
            oneData,
        };
    },
};

export default handleActions(reducers, initialState);