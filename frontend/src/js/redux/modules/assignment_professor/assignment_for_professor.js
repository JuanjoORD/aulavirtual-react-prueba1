import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const ASSIGNMENT_PROFESSOR_HOME = "ASSIGNMENT_PROFESSOR_HOME"
const TOTAL_PENDING_HOMEWORK = "TOTAL_PENDING_HOMEWORK"
const SET_EVENT_STUDENT = "SET_EVENT_STUDENT"

//Funciones para el home del professor

export const pendingHomework = () => (dispatch) => {
    api.post(`/professor/pending_homework`).then(response => {
        NotificationManager.success('Tareas pendientes listadas', 'Éxito', 3000);
        dispatch({type: TOTAL_PENDING_HOMEWORK, pendingHomeworkData: response})
        console.log("TAREAS PENDIETNES DEL PROF:", response)
    })
    .catch(error => {
        console.log('error listCurrentHomework:', error)
        NotificationManager.error('Error al listar tareas próximas', 'ERROR', 0);
    })
}

export const assignmentsProfessorHome = () => (dispatch) => {    
    api.post(`professor/assign_professor_home`).then(response => {
        NotificationManager.success('Asignaturas listadas', 'Éxito', 3000);
        dispatch({type: ASSIGNMENT_PROFESSOR_HOME, assignmenteProfHome: response.professor})
    })
    .catch(error => {
        console.log(`error read assignmentsProfessorHome Student:`, error)
        NotificationManager.error(`Error al leer sus asignaturas, profesor`, 'ERROR', 0);
    })
}

export const listEventStudent = () => (dispatch) => {
    api.get("/event/event_home_student").then(response => {
        console.log("response list Event Student:", response)
        dispatch({type: SET_EVENT_STUDENT, eventStudent: response})        
    })
    .catch(error => {
        console.log(`error listEvent:`, error)
        NotificationManager.error(`Error al listar los eventos para estudiante`, 'ERROR', 0);
    })
}


export const actions = {    
    pendingHomework,
    assignmentsProfessorHome,
    listEventStudent
};

export const initialState = {
    loader: false,
    pendingHomeworkData: null,
    assignmenteProfHome: null,
    eventStudent: null,
};

export const reducers = {    
    [TOTAL_PENDING_HOMEWORK]: (state, { pendingHomeworkData }) => {
        return {
            ...state,
            pendingHomeworkData,
        };
    },
    [ASSIGNMENT_PROFESSOR_HOME]: (state, { assignmenteProfHome }) => {
        return {
            ...state,
            assignmenteProfHome,
        };
    },
    [SET_EVENT_STUDENT]: (state, { eventStudent }) => {
        return {
            ...state,
            eventStudent,
        };
    },
};

export default handleActions(reducers, initialState);