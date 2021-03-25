import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LIST_LEVEL = 'LIST_LEVEL'
const READ_LEVEL = 'READ_LEVEL'
const GRADE_NOT_ADDED = 'GRADE_NOT_ADDED'
const GRADE_ADDED = 'GRADE_ADDED'

export const readLevel = (id) => (dispatch) => {
    api.get(`/level/${id}`).then(response => {        
        dispatch({type: READ_LEVEL, oneData: response})
        dispatch(initializeForm('single_form', response))        
    })
    .catch(error => {
        console.log('error read level:', error)
        NotificationManager.error('Error al leer nivel', 'ERROR', 0);
    })
}

export const listLevel = () => (dispatch) => {
    api.get('/level').then(response => {
        console.log('list level response', response)
        dispatch({type: LIST_LEVEL, data: response})
        dispatch({type: READ_LEVEL, oneData: null})
    })
    .catch(error => {
        console.log('error list level:', error)
        NotificationManager.error('Error al listar los niveles', 'ERROR', 0);
    })
}

export const registerLevel = () => (dispatch, getStore) => {    
    const data = getStore().form.single_form.values    

    api.post('/level', data).then(response => {
        NotificationManager.success('Nivel creado exitosamente', 'Éxito', 3000);
        dispatch(push('/level'))
    })
    .catch(error => {
        console.log('error register level :', error)
        NotificationManager.error('Error al registrar nivel', 'ERROR', 0);
    })
}

export const updateLevel = () => (dispatch, getStore) => {
    //console.log("getStohre:", getStore())
    const data = getStore().form.single_form.values   
    const id = data.id 

    api.put(`/level/${id}`, data).then(response => {
        NotificationManager.success('Nivel actualizado exitosamente', 'Éxito', 3000);
        dispatch(push('/level'))
    })
    .catch(error => {
        console.log('error update level:', error)
        NotificationManager.error('Error al actualizar nivel', 'ERROR', 0);
    })
}

export const deleteLevel = (id) => (dispatch) => {
    console.log('delete level', id)
    
    api.eliminar(`/level/${id}`).then(response => {
        NotificationManager.success('Nivel eliminado exitosamente', 'Éxito', 3000);
        dispatch(listLevel())
    })
    .catch(error => {
        console.log('error delete level:', error)
        NotificationManager.error('Error al eliminar nivel', 'ERROR', 0);
    })
}

//Functions to list and get Grades
export const listGradeNotAdded = () => (dispatch) => {
    api.get('/gradeNotAdded').then(response => {
        console.log('list grade not in level', response)
        dispatch({type: GRADE_NOT_ADDED, gradesNotAdded: response})
    })
    .catch(error => {
        console.log('error list grade not in:', error)
        NotificationManager.error('Error al listar grados ajenos al nivel', 'ERROR', 0);
    })
}

export const listGradeAdded = () => (dispatch) => {
    api.get('/gradeAdded').then(response => {
        console.log('list grade in level', response)
        dispatch({type: GRADE_ADDED, gradesAdded: response})
    })
    .catch(error => {
        console.log('error list grade in:', error)
        NotificationManager.error('Error al listar grados pertenecientes al nivel', 'ERROR', 0);
    })
}

//Function to clear form
export const clearSingleForm2 = () => (dispatch) => {
    dispatch(initializeForm('level_add_grade', {name: "", description: ""}))    
}

//Fucntion for add grades to a level
export const addGradesToLevel = (data) => (dispatch) => {
    console.log("data addGradesToLevel:", data)

    api.post('/grade', data).then(response => {
        NotificationManager.success('Grados agregados exitosamente', 'Éxito', 3000);
        dispatch(push('/level'))
    })
    .catch(error => {
        console.log('error al agregar grados :', error)
        NotificationManager.error('Error al agregar grados', 'ERROR', 0);
    })
}

export const gradesInLevel = (data) => (dispatch) => {    
    api.post('/grade/inLevel', data).then(response => {        
        const jsonData = response.grades        
        const sendData = jsonData.map(grade => {
            return {
                id: grade.id,
                name: grade.name,
                description: grade.description
            }
        })
        dispatch({type: GRADE_ADDED, gradesAdded: sendData})
    })
    .catch(error => {
        console.log('error list grade in:', error)
        NotificationManager.error('Error al listar grados pertenecientes al nivel', 'ERROR', 0);
    })
}



export const actions = {
    readLevel,
    listLevel,
    registerLevel,
    updateLevel,
    deleteLevel,
    listGradeAdded,
    listGradeNotAdded,
    clearSingleForm: clearSingleForm2,
    addGradesToLevel,
    gradesInLevel
};

export const initialState = {
    loader: false,
    data: null,
    oneData: null,
    gradesNotAdded: null,
    gradesAdded: null   
};

export const reducers = {
    [LIST_LEVEL]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [READ_LEVEL]: (state, { oneData }) => {
        return {
            ...state,
            oneData,
        };
    },
    [GRADE_ADDED]: (state, { gradesAdded }) => {
        return {
            ...state,
            gradesAdded,
        };
    },
    [GRADE_NOT_ADDED]: (state, { gradesNotAdded }) => {
        return {
            ...state,
            gradesNotAdded,
        };
    },
};

export default handleActions(reducers, initialState);