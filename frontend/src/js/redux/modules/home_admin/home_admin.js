import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const TOTAL_USERS = "TOTAL_USERS"
const TOTAL_GRADES = "TOTAL_GRADES"
const TOTAL_SECTIONS = "TOTAL_SECTIONS"
const CURRENT_SCHOOL_CYCLE = "CURRENT_SCHOOL_CYCLE"

//Funciones para el home del professor

export const totalUsers = () => (dispatch) => {
    api.post(`/user/total_users`).then(response => {
        NotificationManager.success('Total de usuarios', 'Éxito', 3000);
        dispatch({type: TOTAL_USERS, totalUsersData: response})
        console.log("Total de usuarios:", response)
    })
    .catch(error => {
        console.log('error totalUsers:', error)
        NotificationManager.error('Error al verificar total de usuarios', 'ERROR', 0);
    })
}

export const totalGradesSections = () => (dispatch) => {    
    api.get(`grade/total_grades_sections`).then(response => {
        //NotificationManager.success('Asignaturas listadas', 'Éxito', 3000);
        dispatch({type: TOTAL_GRADES, totalGradesData: response.total_grades})
        dispatch({type: TOTAL_SECTIONS, totalSectionsData: response.total_sections})
    })
    .catch(error => {
        console.log(`error totalGrades:`, error)
        NotificationManager.error(`Error al leer total de grados`, 'ERROR', 0);
    })
}

export const currentSchoolCycle = () => (dispatch) => {
    api.get("/school_cycle/current").then(response => {
        console.log("response currentSchoolCycle:", response)
        dispatch({type: CURRENT_SCHOOL_CYCLE, schoolCycleData: response.school_cycle})
    })
    .catch(error => {
        console.log(`error currentSchoolCycle:`, error)
        NotificationManager.error(`Error al obtener el ciclo escolar actual`, 'ERROR', 0);
    })
}


export const actions = {    
    totalUsers,
    totalGradesSections,
    currentSchoolCycle
};

export const initialState = {
    loader: false,
    totalUsersData: null,
    totalGradesData: null,
    totalSectionsData: null,
    schoolCycleData: null
};

export const reducers = {    
    [TOTAL_USERS]: (state, { totalUsersData }) => {
        return {
            ...state,
            totalUsersData,
        };
    },
    [TOTAL_GRADES]: (state, { totalGradesData }) => {
        return {
            ...state,
            totalGradesData,
        };
    },
    [TOTAL_SECTIONS]: (state, { totalSectionsData }) => {
        return {
            ...state,
            totalSectionsData,
        };
    },
    [CURRENT_SCHOOL_CYCLE]: (state, { schoolCycleData }) => {
        return {
            ...state,
            schoolCycleData,
        };
    },
};

export default handleActions(reducers, initialState);