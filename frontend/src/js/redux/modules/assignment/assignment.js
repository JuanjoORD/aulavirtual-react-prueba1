import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LIST_ASSIGNMENT = 'LIST_ASSIGNMENT'
const READ_ASSIGNMENT = 'READ_ASSIGNMENT' 

const GENDER_OPTIONS = [
    'Masculino',
    'Femenino'
]

const baseRoute = "/assignment"

const formatData = (inputData) => {
    const isItArray = Array.isArray(inputData)
    let myData = null
    if(isItArray){
        myData = inputData.map(data => {
            const format = {
                course: data.course.value,
                section: data.section.value,
                grade: data.grade.value,
                cover: data.cover,
                description: data.description,
                schoolcycle: data.schoolcycle,
                id: data.id
            }
    
            return format
        })
    }
    else{
        myData = {
            course: inputData.course.value,
            section: inputData.section.value,
            grade: inputData.grade.value,
            cover: inputData.cover,
            description: inputData.description,
            schoolcycle: inputData.schoolcycle,
            id: inputData.id
        }
    }
    return myData
}

const entryData = (data) => {
    const myData = {
        course: {value: data.course.id, label: data.course.name},
        section: {value: data.section.id, label: data.section.name},
        grade: {value: data.grade.id, label: data.grade.name},
        cover: data.cover,
        description: data.description,
        schoolcycle: data.schoolcycle,
        id: data.id
    }
    return myData
}

export const readAssignment = (id) => (dispatch) => {
    api.get(`${baseRoute}/${id}`).then(response => {                
        console.log('read assignment response:', response)
        dispatch({type: READ_ASSIGNMENT, oneData: entryData(response)})
        dispatch(initializeForm('assignment_form', entryData(response)))
    })
    .catch(error => {
        console.log('error assignment:', error)
        NotificationManager.error('Error al leer la Asignatura', 'ERROR', 0);
    })
}

export const listAssignment = () => (dispatch) => {
    api.get(baseRoute).then(response => {
        console.log('assignment list for profesorssss', response)
        dispatch({type: LIST_ASSIGNMENT, data: response})
        dispatch({type: READ_ASSIGNMENT, oneData: null})
    })
    .catch(error => {
        console.log('error assignment:', error)
        NotificationManager.error('Error al listar las Asignaturas', 'ERROR', 0);
    })
}

export const registerAssignment = (data={}) => (dispatch) => {        
    const sendData = formatData(data)    
    console.log('assignment register ONLY DATA:', formatData(data))

    api.post(baseRoute, sendData).then(response => {
        NotificationManager.success('Asignatura creada exitosamente', 'Éxito', 3000);
        dispatch(push(baseRoute))
    })
    .catch(error => {
        console.log('error assignment:', error)
        NotificationManager.error('Error al registrar la Asignatura', 'ERROR', 0);
    })
}

export const updateAssignment = (data={}, attachments=[]) => (dispatch) => {    
    const id = data.id

    const sendData = formatData(data)

    console.log('update professor sendData:', sendData)    
    console.log('update professor attachments:', attachments)    

    api.putAttachments(`${baseRoute}/${id}`, sendData, attachments).then(response => {
        NotificationManager.success('Profesor actualizado exitosamente', 'Éxito', 3000);
        dispatch(push(baseRoute))
    })
    .catch(error => {
        console.log('error professor update:', error)
        NotificationManager.error('Error al actualizar profesor', 'ERROR', 0);
    })
}

export const deleteAssignment = (id) => (dispatch) => {
    console.log('delete Assignment', id)
    
    api.eliminar(`${baseRoute}/${id}`).then(response => {
        NotificationManager.success('Asignatura eliminada exitosamente', 'Éxito', 3000);
        dispatch(listAssignment())
    })
    .catch(error => {
        console.log('error Assignment:', error)
        NotificationManager.error('Error al eliminar Asignatura', 'ERROR', 0);
    })
}

//PARA SELECT
export const gradeSelect = (search) => () => {    
    return api.get("/grade", (search)).then(response => {            

        let options = []                     
        if(response){
            options = response.results.map(option => {
                return { value: option.id, label: option.name }
            });            
        }         
        return options
    })
    .catch(error => {
        console.log('error gradeSelect:', error)
        NotificationManager.error('Error al listar gradeSelect', 'ERROR', 0);        
        return []
    })    
}

export const sectionSelect = (search) => () => {    
    return api.get("/section", (search)).then(response => {            

        let options = []                     
        if(response){
            options = response.results.map(option => {
                return { value: option.id, label: option.name }
            });            
        }         
        return options
    })
    .catch(error => {
        console.log('error sectionSelect:', error)
        NotificationManager.error('Error al listar sectionSelect', 'ERROR', 0);        
        return []
    })    
}

export const courseSelect = (search) => () => {    
    return api.get("/course", (search)).then(response => {            

        let options = []                     
        if(response){
            options = response.results.map(option => {
                return { value: option.id, label: option.name }
            });            
        }         
        return options
    })
    .catch(error => {
        console.log('error courseSelect:', error)
        NotificationManager.error('Error al listar courseSelect', 'ERROR', 0);        
        return []
    })    
}

export const clearForm = () => (dispatch) => {
    dispatch(initializeForm('assignment_form', {section: undefined, grade: undefined, course: undefined, cover: undefined, description: undefined}))    
}

export const actions = {
    readAssignment,
    listAssignment,
    registerAssignment,
    updateAssignment,
    deleteAssignment,
    gradeSelect,
    sectionSelect,
    courseSelect,
    clearForm
};

export const initialState = {
    loader: false,
    data: null,
    oneData: null,
    assignmentAdded: null  
};

export const reducers = {
    [LIST_ASSIGNMENT]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [READ_ASSIGNMENT]: (state, { oneData }) => {
        return {
            ...state,
            oneData,
        };
    },
};

export default handleActions(reducers, initialState);