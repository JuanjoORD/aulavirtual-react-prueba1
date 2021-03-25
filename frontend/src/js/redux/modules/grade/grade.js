import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LIST_GRADE = 'LIST_LABEL'
const READ_GRADE = 'READ_GRADE'
const LIST_LEVEL = 'LIST_LEVEL'

const principalEndPoint = '/grade'

export const readGrade = (id) => (dispatch) => {
    api.get(`${principalEndPoint}/${id}`).then(response => {
        console.log('grade read response:', response)
        dispatch({type: READ_GRADE, oneData: response})
        dispatch(initializeForm('grade_form', response))
    })
    .catch(error => {
        console.log('error read grade:', error)
        NotificationManager.error('Error al leer grado', 'ERROR', 0);
    })
}

export const listGrade = () => (dispatch) => {
    api.get(principalEndPoint).then(response => {
        console.log('list grade response', response)
        dispatch({type: LIST_GRADE, data: response})
        dispatch({type: READ_GRADE, oneData: null})
    })
    .catch(error => {
        console.log('error list grade:', error)
        NotificationManager.error('Error al listar los grados', 'ERROR', 0);
    })
}

export const registerGrade = () => (dispatch, getStore) => {    
    const data = getStore().form.grade_form.values    
    console.log("data register grade:", data)
    /*api.post(principalEndPoint, data).then(response => {
        NotificationManager.success('Grado creado exitosamente', 'Éxito', 3000);
        dispatch(push(principalEndPoint))
    })
    .catch(error => {
        console.log('error register grade :', error)
        NotificationManager.error('Error al registrar grado', 'ERROR', 0);
    })*/
}

export const updateGrade = () => (dispatch, getStore) => {
    //console.log("getStohre:", getStore())
    const data = getStore().form.grade_form.values   
    const id = data.id 

    api.put(`${principalEndPoint}/${id}`, data).then(response => {
        NotificationManager.success('Nivel actualizado exitosamente', 'Éxito', 3000);
        dispatch(push(principalEndPoint))
    })
    .catch(error => {
        console.log('error update level:', error)
        NotificationManager.error('Error al actualizar grado', 'ERROR', 0);
    })
}

export const deleteGrade = (id) => (dispatch) => {
    console.log('delete grade', id)
    
    api.eliminar(`${principalEndPoint}/${id}`).then(response => {
        NotificationManager.success('Grado eliminado exitosamente', 'Éxito', 3000);
        dispatch(listGrade())
    })
    .catch(error => {
        console.log('error delete grade:', error)
        NotificationManager.error('Error al eliminar grado', 'ERROR', 0);
    })
}

//Functin to list levels

export const listLevel = (search) => () => {
    return api.get('/level', (search)).then(response => {

        let levelOptions = []
        console.log('level from grade:', response)

        if(response){
            levelOptions = response.results.map(d => {
                return { value: d.id, label: d.name }
            });            
        }         
        return levelOptions        
    })
    .catch(error => {
        console.log('error list level from grade:', error)
        NotificationManager.error('Error al listar los niveles desde grado', 'ERROR', 0);
    })
}




export const actions = {
    readGrade,
    listGrade,
    registerGrade,
    updateGrade,
    deleteGrade,
    listLevel
};

export const initialState = {
    loader: false,
    data: null,
    oneData: null,    
};

export const reducers = {    
    [LIST_GRADE]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [READ_GRADE]: (state, { oneData }) => {
        return {
            ...state,
            oneData,
        };
    },
};

export default handleActions(reducers, initialState);