import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

import { setMyAssignments } from "../professor/professor"

const LIST = 'LIST'
const READ = 'READ'

const principalEndPoint = '/assignment_professor'
const singularMessage = "asignación del maestro" //Error al leer...
const pluralMessage = "las asignaciones de professores" //Error al listar...
const forConsoleLog = "AssignProfessor"
const formData = "assign_professor_form"
const nameModel = "Asignación de profesor" //...creado(a) exitosamente -- Error al registrar...
const genderWord ="a" //CREADa - ACTUALIZADa

export const readAssignProfessor = (id) => (dispatch) => {
    api.get(`${principalEndPoint}/${id}`).then(response => {
        console.log(`${forConsoleLog} read response:`, response)

        dispatch({type: READ, oneData: response})
        dispatch(initializeForm(formData, response))
    })
    .catch(error => {
        console.log(`error read ${forConsoleLog}:`, error)
        NotificationManager.error(`Error al leer ${singularMessage}`, 'ERROR', 0);
    })
}

export const listAssignProfessor = () => (dispatch) => {
    api.get(principalEndPoint).then(response => {
        console.log(`list ${forConsoleLog} response:`, response)

        dispatch({type: LIST, data: response})
        dispatch({type: READ, oneData: null})
    })
    .catch(error => {
        console.log(`error list ${forConsoleLog}:`, error)
        NotificationManager.error(`Error al listar ${pluralMessage}`, 'ERROR', 0);
    })
}

export const registerAssignProfessor = (toAdd, toDelete, idProf) => (dispatch) => {  
    const adding = toAdd.map(e => {return e.value})

    console.log("register AssignProfessor:", {adding, toDelete, idProf})

    const data = {
        toAdd: adding,
        toDelete,
        idProfessor: idProf
    }
    
    api.post(principalEndPoint, data).then(response => {
        NotificationManager.success(`${nameModel} cread${genderWord} exitosamente`, 'Éxito', 3000);
        dispatch(push("/professor"))
    })
    .catch(error => {
        console.log(`error register ${forConsoleLog}:`, error)
        NotificationManager.error(`Error al registrar ${nameModel}`, 'ERROR', 0);
    })
}

export const updateAssignProfessor = () => (dispatch, getStore) => {    
    const data = getStore().form.assign_professor_form.values

    console.log(`update ${forConsoleLog}`, data)
    const id = data.id 

    api.put(`${principalEndPoint}/${id}`, data).then(response => {
        NotificationManager.success(`${nameModel} actualizad${genderWord} exitosamente`, 'Éxito', 3000);
        dispatch(push(principalEndPoint))
    })
    .catch(error => {
        console.log(`error update ${forConsoleLog}:`, error)
        NotificationManager.error(`Error al actualizar ${nameModel}`, 'ERROR', 0);
    })
}

export const deleteAssignProfessor = (id) => (dispatch) => {
    console.log(`delete ${forConsoleLog}:`, id)
    
    api.eliminar(`${principalEndPoint}/${id}`).then(response => {
        NotificationManager.success(`${nameModel} eliminad${genderWord} exitosamente`, 'Éxito', 3000);
        dispatch(listAssignProfessor())
    })
    .catch(error => {
        console.log(`error delete ${forConsoleLog}:`, error)
        NotificationManager.error(`Error al eliminar ${nameModel}`, 'ERROR', 0);
    })
}

export const clearForm = () => (dispatch) => {
    dispatch(initializeForm("professor_assignment_form", {assignment: undefined}))
}

//Function for select asignments
export const assignmentSelect = (search) => () => {    
    return api.get(`${principalEndPoint}/listSelect`, (search)).then(response => {            

        let myOptions = []                     
        if(response){
            myOptions = response.results.map(p => {
                const name = `${p.course.name}, ${p.grade.name}, ${p.section.name}`
                return { value: p.id, label: name }
            });            
        }         
        return myOptions
    })
    .catch(error => {
        console.log('error assignmentSelect Professor:', error)
        NotificationManager.error('Error al listar asignaturas para select profesor', 'ERROR', 0);        
        return []
    })    
}


export const actions = {
    readAssignProfessor,
    listAssignProfessor,
    registerAssignProfessor,
    updateAssignProfessor,
    deleteAssignProfessor,
    assignmentSelect
};

export const initialState = {
    loader: false,
    data: null,
    oneData: null, 
};

export const reducers = {    
    [LIST]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [READ]: (state, { oneData }) => {
        return {
            ...state,
            oneData,
        };
    },
};

export default handleActions(reducers, initialState);