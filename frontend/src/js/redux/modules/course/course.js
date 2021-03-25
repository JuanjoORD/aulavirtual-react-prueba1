import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LIST_COURSE = 'LIST_COURSE'
const READ_COURSE = 'READ_COURSE' 

export const readCourse = (id) => (dispatch) => {
    api.get(`/course/${id}`).then(response => {
        console.log('course response:', response)
        dispatch({type: READ_COURSE, oneData: response})
        dispatch(initializeForm('single_form', response))
    })
    .catch(error => {
        console.log('error read course:', error)
        NotificationManager.error('Error al leer el curso', 'ERROR', 0);
    })
}

export const listCourse = () => (dispatch) => {
    api.get('/course').then(response => {
        console.log('course list', response)
        dispatch({type: LIST_COURSE, data: response})
    })
    .catch(error => {
        console.log('error course:', error)
        NotificationManager.error('Error al listar cursos', 'ERROR', 0);
    })
}

export const registerCourse = () => (dispatch, getStore) => {    
    const data = getStore().form.single_form.values    

    api.post('/course', data).then(response => {
        NotificationManager.success('Curso creado exitosamente', 'Éxito', 3000);
        dispatch(push('/course'))
    })
    .catch(error => {
        console.log('error register course :', error)
        NotificationManager.error('Error al registrar el curso', 'ERROR', 0);
    })
}

export const updateCourse = () => (dispatch, getStore) => {
    const data = getStore().form.single_form.values   
    const id = data.id 

    api.put(`/course/${id}`, data).then(response => {
        NotificationManager.success('Curso actualizado exitosamente', 'Éxito', 3000);
        dispatch(push('/course'))
    })
    .catch(error => {
        console.log('error update course:', error)
        NotificationManager.error('Error al actualizar curso', 'ERROR', 0);
    })
}

export const deleteCourse = (id) => (dispatch) => {
    console.log('delete course', id)
    
    api.eliminar(`/course/${id}`).then(response => {
        NotificationManager.success('Curso eliminado exitosamente', 'Éxito', 3000);
        dispatch(listCourse())
    })
    .catch(error => {
        console.log('error delete course:', error)
        NotificationManager.error('Error al eliminar curso', 'ERROR', 0);
    })
}

export const actions = {
    readCourse,
    listCourse,
    registerCourse,
    updateCourse,
    deleteCourse
};

export const initialState = {
    loader: false,
    data: null,
    oneData: null   
};

export const reducers = {
    [LIST_COURSE]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [READ_COURSE]: (state, { oneData }) => {
        return {
            ...state,
            oneData,
        };
    },
};

export default handleActions(reducers, initialState);