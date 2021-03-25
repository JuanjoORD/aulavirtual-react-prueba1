import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LIST_SECTION = 'LIST_SECTION'
const READ_SECTION = 'READ_SECTION' 

export const readSection = (id) => (dispatch) => {
    api.get(`/section/${id}`).then(response => {
        console.log('section response:', response)
        dispatch({type: READ_SECTION, oneData: response})
        dispatch(initializeForm('single_form', response))
    })
    .catch(error => {
        console.log('error read section:', error)
        NotificationManager.error('Error al leer la sección', 'ERROR', 0);
    })
}

export const listSection = () => (dispatch) => {
    api.get('/section').then(response => {
        console.log('section list', response)
        dispatch({type: LIST_SECTION, data: response})
    })
    .catch(error => {
        console.log('error section:', error)
        NotificationManager.error('Error al listar secciones', 'ERROR', 0);
    })
}

export const registerSection = () => (dispatch, getStore) => {    
    const data = getStore().form.single_form.values    

    api.post('/section', data).then(response => {
        NotificationManager.success('Sección creada exitosamente', 'Éxito', 3000);
        dispatch(push('/section'))
    })
    .catch(error => {
        console.log('error register section :', error)
        NotificationManager.error('Error al registrar sección', 'ERROR', 0);
    })
}

export const updateSection = () => (dispatch, getStore) => {
    //console.log("getStohre:", getStore())
    const data = getStore().form.single_form.values   
    const id = data.id 

    api.put(`/section/${id}`, data).then(response => {
        NotificationManager.success('Sección actualizada exitosamente', 'Éxito', 3000);
        dispatch(push('/section'))
    })
    .catch(error => {
        console.log('error update section:', error)
        NotificationManager.error('Error al actualizar sección', 'ERROR', 0);
    })
}

export const deleteSection = (id) => (dispatch) => {
    console.log('delete section', id)
    
    api.eliminar(`/section/${id}`).then(response => {
        NotificationManager.success('Sección eliminada exitosamente', 'Éxito', 3000);
        dispatch(listSection())
    })
    .catch(error => {
        console.log('error delete section:', error)
        NotificationManager.error('Error al eliminar sección', 'ERROR', 0);
    })
}

export const actions = {
    readSection,
    listSection,
    registerSection,
    updateSection,
    deleteSection
};

export const initialState = {
    loader: false,
    data: null,
    oneData: null   
};

export const reducers = {
    [LIST_SECTION]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [READ_SECTION]: (state, { oneData }) => {
        return {
            ...state,
            oneData,
        };
    },
};

export default handleActions(reducers, initialState);