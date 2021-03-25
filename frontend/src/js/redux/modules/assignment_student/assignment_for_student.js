import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LIST = 'LIST'
const SET_COUNT_RES = 'SET_COUNT_RES'
const SET_DATA_MATERIAL = "SET_DATA_MATERIAL"
const SET_DATA_HOMEWORK = "SET_DATA_HOMEWORK"
const SET_DETAIL_HOMEWORK = "SET_DETAIL_HOMEWORK"
const SET_DETAIL_DELIVER_HOMEWORK = "SET_DETAIL_DELIVER_HOMEWORK"
const SET_EVENT_STUDENT = "SET_EVENT_STUDENT"
const SET_UPCOMING_HOMEWORK = "SET_UPCOMING_HOMEWORK"
const SET_ASSIGNMENT_HOME = "SET_ASSIGNMENT_HOME"
const MY_QUALIFICATIONS = "MY_QUALIFICATIONS"

const principalEndPoint = '/assignment_student'


//Listar las clases que tiene asignadas el estudiante
export const myAssignmentsStudent = () => (dispatch) => {    
    api.post(`${principalEndPoint}/myAssignmentsStudent`).then(response => {        

        console.log(`read myAssignments Student xd:`, response.results)
        
        dispatch({type: LIST, data: response.results})        
    })
    .catch(error => {
        console.log(`error read myAssignments Student:`, error)
        NotificationManager.error(`Error al leer sus asignaturas, estudiante`, 'ERROR', 0);
    })
}

//Listar los materiales de la clase actual, id
export const listCurrentMaterial = (id) => (dispatch) => {
    console.log('DATA ID listCurrentMaterial:', {id})

    api.post(`/class_material/current_material`, {id}).then(response => {
        NotificationManager.success('Material listado', 'Éxito', 3000);
        dispatch({type: SET_DATA_MATERIAL, materialList: response.class_material})        
    })
    .catch(error => {
        console.log('error listCurrentMaterial:', error)
        NotificationManager.error('Error al listar material de clase', 'ERROR', 0);
    })
}

//Listar las tareas de la clase actual, id
export const listCurrentHomework = (id) => (dispatch) => {
    console.log('DATA ID listCurrentHomework:', {id})

    api.post(`/class_material/current_homework`, {id}).then(response => {
        NotificationManager.success('Tareas listadas', 'Éxito', 3000);
        dispatch({type: SET_DATA_HOMEWORK, homeworkList: response.homework})        
        dispatch({type: SET_DETAIL_HOMEWORK, homeworkForm: null})
        dispatch({type: SET_COUNT_RES, countResHomework: null})
        dispatch({type: SET_DETAIL_DELIVER_HOMEWORK, dataDeliverHomework: null})
        console.log("LAS TAREAS MI PANITA:", response)
    })
    .catch(error => {
        console.log('error listCurrentHomework:', error)
        NotificationManager.error('Error al listar tareas', 'ERROR', 0);
    })
}

//Ver el detalle de una tarea y verifica si la tarea ya tiene entrega o es primera vez
export const detailHomework = (id, assignment) => (dispatch) => {
    console.log(`detailHomework:`, {id, assignment})
    
    api.post(`/class_material/detail_homework/`, {id, assignment}).then(response => {
        NotificationManager.success(`Detalle de tarea`, 'Éxito', 3000);

        dispatch(initializeForm("homework_form", response.homework))
        dispatch({type: SET_DETAIL_HOMEWORK, homeworkForm: response.homework})
        dispatch({type: SET_COUNT_RES, countResHomework: response.count})
        dispatch({type: SET_DETAIL_DELIVER_HOMEWORK, dataDeliverHomework: response.res_homework})
        console.log("DETAIL HOMEWORK:", response)
    })
    .catch(error => {
        console.log(`error deleteHomework:`, error)
        NotificationManager.error(`Error al ver detalle de tarea`, 'ERROR', 0);
    })
}

//Funciones para HOMEWORK - STUDENT

export const registerHomeworkStudent = (data={}, attachments=[]) => (dispatch) => {
    console.log('DATA DE registerHomework Student:', {data, attachments})

    return api.postAttachments('/homework_student', data, attachments).then(response => {
        console.log("response of registerHomework student:", response)
        dispatch({type: SET_COUNT_RES, countResHomework: 1})
        dispatch({type: SET_DETAIL_DELIVER_HOMEWORK, dataDeliverHomework: response.homework_student})
        NotificationManager.success('Tarea entregada correctamente', 'Éxito', 3000);        
        return true
    })
    .catch(error => {
        console.log('error registerHomework Student:', error)
        NotificationManager.error('Error al enviar la tarea', 'ERROR', 0);
        return false
    })
}

export const updateHomeworkStudent = (data={}, attachments=[]) => (dispatch, getStore) => {
    console.log('DATA updateHomework Student:', {data, attachments})
    const dataInitial = getStore().assignment_for_student.dataDeliverHomework

    return api.putAttachments(`/homework_student/${dataInitial.id}`, data, attachments).then(response => {
        console.log("response of updateHomework student:", response)        
        dispatch({type: SET_DETAIL_DELIVER_HOMEWORK, dataDeliverHomework: response.homework_student})
        NotificationManager.success('Entrega actualizada correctamente', 'Éxito', 3000);
        return true
    })
    .catch(error => {
        console.log('error updateHomework Student:', error)
        NotificationManager.error('Error al actualizar la entrega', 'ERROR', 0);
        return false
    })
}

export const editHomeworkStudent = () => (dispatch, getStore) => {
    const dataInitial = getStore().assignment_for_student.dataDeliverHomework
    console.log("el getStore:", dataInitial)
    dispatch(initializeForm("deliver_homework_form", {text: dataInitial.text}))
    return true
}

//Funciones para el Home del estudiante

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

export const upcomingHomework = () => (dispatch) => {    

    api.post(`/homework/upcoming_homework`).then(response => {
        NotificationManager.success('Tareas próximas listadas', 'Éxito', 3000);
        dispatch({type: SET_UPCOMING_HOMEWORK, upcomingHomeworkData: response.homework})
        console.log("LAS TAREAS PROXIMA MI PANITA:", response)
    })
    .catch(error => {
        console.log('error listCurrentHomework:', error)
        NotificationManager.error('Error al listar tareas próximas', 'ERROR', 0);
    })
}

export const assignmentsStudentHome = () => (dispatch) => {    
    api.post(`homework/assignstudent_home`).then(response => {
        dispatch({type: SET_ASSIGNMENT_HOME, assignmentHome: response.homework})
    })
    .catch(error => {
        console.log(`error read assignmentsStudentHome Student:`, error)
        NotificationManager.error(`Error al leer sus asignaturas, estudiante`, 'ERROR', 0);
    })
}

//Para que el estudiante vea sus calificiones geerales
export const myQualifications = () => (dispatch) => {    
    api.post(`student/my_qualifications`).then(response => {        
        dispatch({type: MY_QUALIFICATIONS, myQualificationsData: response.student})
    })
    .catch(error => {
        console.log(`error read myQualifications Student:`, error)
        NotificationManager.error(`Error al leer sus calificaciones, estudiante`, 'ERROR', 0);
    })
}



export const actions = {        
    listCurrentMaterial,
    listCurrentHomework,
    detailHomework,
    registerHomeworkStudent,
    updateHomeworkStudent,
    editHomeworkStudent,
    listEventStudent,
    myAssignmentsStudent,
    upcomingHomework,
    assignmentsStudentHome,
    myQualifications,
};

export const initialState = {
    loader: false,
    data: null,
    oneData: null,
    materialList: null,
    homeworkList: null,
    homeworkForm: null,
    countResHomework: null,
    dataDeliverHomework: null,
    eventStudent: null,
    upcomingHomeworkData: null,
    assignmentHome: null,
    myQualificationsData: null
};

export const reducers = {    
    [LIST]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_COUNT_RES]: (state, { countResHomework }) => {
        return {
            ...state,
            countResHomework,
        };
    },
    [SET_DATA_MATERIAL]: (state, { materialList }) => {
        return {
            ...state,
            materialList,
        };
    },
    [SET_DATA_HOMEWORK]: (state, { homeworkList }) => {
        return {
            ...state,
            homeworkList,
        };
    },
    [SET_DETAIL_HOMEWORK]: (state, { homeworkForm }) => {
        return {
            ...state,
            homeworkForm,
        };
    },
    [SET_DETAIL_DELIVER_HOMEWORK]: (state, { dataDeliverHomework }) => {
        return {
            ...state,
            dataDeliverHomework,
        };
    },
    [SET_UPCOMING_HOMEWORK]: (state, { upcomingHomeworkData }) => {
        return {
            ...state,
            upcomingHomeworkData,
        };
    },
    [SET_ASSIGNMENT_HOME]: (state, { assignmentHome }) => {
        return {
            ...state,
            assignmentHome,
        };
    },
    [SET_EVENT_STUDENT]: (state, { eventStudent }) => {
        return {
            ...state,
            eventStudent,
        };
    },
    [MY_QUALIFICATIONS]: (state, { myQualificationsData }) => {
        return {
            ...state,
            myQualificationsData,
        };
    },
};

export default handleActions(reducers, initialState);