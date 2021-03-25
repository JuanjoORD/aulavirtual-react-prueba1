import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

import { initialState as stateLogin } from "../cuenta/login"

const LIST = 'LIST'
const READ = 'READ'
const ASSIGNMENTS_OF_PROFESSOR = "ASSIGNMENTS_OF_PROFESSOR"
const LIST_CURRENT_STUDENTS = "LIST_CURRENT_STUDENTS"
const SET_DATA_TABLE_MATERIAL = "SET_DATA_TABLE_MATERIAL"
const SET_FORM_MATERIAL = "SET_FORM_MATERIAL"
const SET_DATA_TABLE_HOMEWORK = "SET_DATA_TABLE_HOMEWORK"
const SET_FORM_HOMEWORK = "SET_FORM_HOMEWORK"
const SET_DATA_HOMEWORK_NOTE = "SET_DATA_HOMEWORK_NOTE"
const SET_HOMEWORK_STUDENT_NOTE = "SET_HOMEWORK_STUDENT_NOTE"

const principalEndPoint = '/assignment_student'
const singularMessage = "asignación del estudiante" //Error al leer...
const forConsoleLog = "Assign Student"
const formData = "assign_student_form"

//Function for list assignments of professor
export const myAssignmentsProf = () => (dispatch, getStore) => { 
    //const me = getStore().login.me

    api.post(`${principalEndPoint}/myAssignmentsProf`).then(response => {        

        console.log(`read myAssignments professors xd:`, response.results)
        
        dispatch({type: ASSIGNMENTS_OF_PROFESSOR, assignmentsProf: response.results})
        dispatch({type: SET_FORM_MATERIAL, currentFormMaterial: null})
    })
    .catch(error => {
        console.log(`error read myAssignments Professor:`, error)
        NotificationManager.error(`Error al leer sus asignaturas, profesor`, 'ERROR', 0);
    })
}

//Fuction for update students of an assignment (add or delete)
//myData is an array of objects with this structure {id: id, student: {value: id, label: studentName}}
export const updateStudentAssign = (id, toAdd, toDelete) => (dispatch) => {
    const arrayDelete = toDelete.map(data => {return data.student.value})
    const data = {id: id, students: toAdd, toDelete: arrayDelete}
    console.log(`read updateStudentAssign xd:`, data)

    api.post(`${principalEndPoint}/updateStudentAssign`, data).then(response => {        

        console.log(`read updateStudentAssign xd:`, response)
        dispatch(push("/my_assignment_prof/home"))          
    })
    .catch(error => {
        console.log(`error updateStudentAasing:`, error)
        NotificationManager.error(`Error al actualizar su asignatura, profesor`, 'ERROR', 0);
    })
}

//Function to get the information to use in the select
export const studentSelect = (search) => () => {    
    return api.get("/student", (search)).then(response => {  
        console.log(`CONSOLE studentSelect:`, response)          

        let options = []                     
        if(response){
            options = response.results.map(option => {
                return { value: option.id, label: `${option.profile.user.first_name} ${option.profile.user.last_name}` }
            });            
        }         
        return options
    })
    .catch(error => {
        console.log('error studentSelect:', error)
        NotificationManager.error('Error al listar studentSelect', 'ERROR', 0);        
        return []
    })    
}

//Functio to get name of current assignment
export const readNameCurrentAssign = (id) => (dispatch) => {
    api.get(`assignment/${id}`).then(response => {
        console.log(`${forConsoleLog} readNameCurrentAssign read response:`, response)
        const dataRead = {
            assignment: `${response.course.name}, ${response.grade.name}, ${response.section.name}`,
            student: undefined,
        }

        dispatch({type: READ, oneData: dataRead})
        dispatch(initializeForm(formData, {assignment: dataRead.assignment, student: dataRead.student}))
    })
    .catch(error => {
        console.log(`error read readNameCurrentAssign:`, error)
        NotificationManager.error(`Error al leer readNameCurrentAssign ${singularMessage}`, 'ERROR', 0);
    })
}

//Lista a los estudiantes que actualment están asignados a este curso
export const listStudentCurrentAssing = (id) => (dispatch) => {
    const data = {id}
    api.post(`${principalEndPoint}/listStudentCurrentAssing`, data).then(response => {
        console.log(`${forConsoleLog} listStudentCurrentAssing read response:`, response)
        
        const currentStudents = response.results.map(student => {
            const format = {
                id: student.id,
                student: {
                    value: student.id,
                    label: `${student.profile.user.first_name} ${student.profile.user.last_name}`
                }
            }
            return format
        })

        dispatch({type: LIST_CURRENT_STUDENTS, currentStudents})
        NotificationManager.success('Estudiantes listados correctamente', 'Éxito', 3000);
    })
    .catch(error => {
        console.log(`error read listStudentCurrentAssing:`, error)
        NotificationManager.error(`Error al leer listStudentCurrentAssing ${singularMessage}`, 'ERROR', 0);
    })
}

export const clearForm = (assignment) => (dispatch) => {
    dispatch(initializeForm(formData, {student: undefined, assignment: assignment}))
}

//INICIO de funciones para el MATERIAL DE CLASE
//-----------------------------------------------------
export const clearFormMaterial = () => (dispatch) => {
    dispatch(initializeForm("assign_material_form", {title: undefined, description: undefined, myfile: undefined}))
    dispatch({type: SET_FORM_MATERIAL, currentFormMaterial: null})
}

export const registerMaterial = (data={}, attachments=[]) => (dispatch) => {
    console.log('DATA DE registerMaterial:', {data, attachments})

    api.postAttachments('/class_material', data, attachments).then(response => {
        NotificationManager.success('Material de clase creado exitosamente', 'Éxito', 3000);        
        dispatch({type: SET_DATA_TABLE_MATERIAL, dataTableMaterial: response.class_material})        
    })
    .catch(error => {
        console.log('error registerMaterial:', error)
        NotificationManager.error('Error al registrar material de clase', 'ERROR', 0);
    })
}

export const listCurrentMaterial = (id) => (dispatch) => {
    console.log('DATA ID listCurrentMaterial:', {id})

    api.post(`/class_material/current_material`, {id}).then(response => {
        NotificationManager.success('Material listado', 'Éxito', 3000);
        dispatch({type: SET_DATA_TABLE_MATERIAL, dataTableMaterial: response.class_material})        
    })
    .catch(error => {
        console.log('error listCurrentMaterial:', error)
        NotificationManager.error('Error al listar material de clase', 'ERROR', 0);
    })
}

export const editMaterial = (data={}) => (dispatch) => {
    const formData = {
        id: data.id,
        title: data.title,
        description: data.description,
        myfile: data.myfile
    }
    dispatch({type: SET_FORM_MATERIAL, currentFormMaterial: formData})
    dispatch(initializeForm("assign_material_form", formData))
}

export const updateMaterial = (data={}, attachments=[]) => (dispatch) => {
    console.log('DATA updateMaterial:', {data, attachments})

    api.putAttachments(`/class_material/${data.id}`, data, attachments).then(response => {
        NotificationManager.success('Material actualizado correctamente', 'Éxito', 3000);
        dispatch({type: SET_DATA_TABLE_MATERIAL, dataTableMaterial: response.class_material})
    })
    .catch(error => {
        console.log('error updateMaterial:', error)
        NotificationManager.error('Error al actualizar material de clase', 'ERROR', 0);
    })
}

export const deleteMaterial = (id, assignment) => (dispatch) => {
    console.log(`deleteMaterial:`, {id})
    
    api.post(`class_material/deleteMaterial`, {id, assignment}).then(response => {
        NotificationManager.success(`Material de clase eliminado exitosamente`, 'Éxito', 3000);
        dispatch({type: SET_DATA_TABLE_MATERIAL, dataTableMaterial: response.class_material})
    })
    .catch(error => {
        console.log(`error deleteMaterial:`, error)
        NotificationManager.error(`Error al eliminar material de clase`, 'ERROR', 0);
    })
}

//INICIO de funciones para la TAREA / HOMEWORK
//-----------------------------------------------------
export const clearFormHomework = () => (dispatch) => {
    dispatch(initializeForm("homework_form", {title: undefined, description: undefined, date_delivery: undefined, myvalue: undefined, attached: null}))
    dispatch({type: SET_FORM_HOMEWORK, dataFormHomework: null})
}

export const registerHomework = (data={}) => (dispatch) => {
    if(data.attached === null)
        data.attached = false

    console.log('DATA DE registerHomework:', {data})

    return api.post('/class_material/create_homework', data).then(response => {
        NotificationManager.success('Tarea creada exitosamente', 'Éxito', 3000);        
        dispatch({type: SET_DATA_TABLE_HOMEWORK, dataTableHomework: response.homework})        
        return true
    })
    .catch(error => {
        console.log('error registerHomework:', error)
        NotificationManager.error('Error al registrar tarea', 'ERROR', 0);
        return false
    })
}

export const listCurrentHomework = (id) => (dispatch) => {
    console.log('DATA ID listCurrentHomework:', {id})

    api.post(`/class_material/current_homework`, {id}).then(response => {
        NotificationManager.success('Tareas listadas', 'Éxito', 3000);
        dispatch({type: SET_DATA_TABLE_HOMEWORK, dataTableHomework: response.homework})        
    })
    .catch(error => {
        console.log('error listCurrentHomework:', error)
        NotificationManager.error('Error al listar tareas', 'ERROR', 0);
    })
}

export const editHomework = (data={}) => (dispatch) => {
    const formData = {
        id: data.id,
        title: data.title,
        description: data.description,
        date_delivery: data.date_delivery,
        myvalue: data.myvalue,
        attached: data.attached
    }
    dispatch({type: SET_FORM_HOMEWORK, dataFormHomework: formData})
    dispatch(initializeForm("homework_form", formData))
}

export const updateHomework = (data={}) => (dispatch) => {
    if(data.attached === null)
        data.attached = false
    console.log('DATA updateHomework:', {data})

    return api.post(`/class_material/update_homework`, data).then(response => {        
        NotificationManager.success('Tarea actualizada correctamente', 'Éxito', 3000);
        dispatch({type: SET_DATA_TABLE_HOMEWORK, dataTableHomework: response.homework})
        return true
    })
    .catch(error => {
        console.log('error updateHomework:', error)
        NotificationManager.error('Error al actualizar tarea', 'ERROR', 0);
        return false
    })    
}

export const deleteHomework = (id, assignment) => (dispatch) => {
    console.log(`deleteHomework:`, {id, assignment})
    
    api.post(`/class_material/delete_homework/`, {id, assignment}).then(response => {
        NotificationManager.success(`Tarea eliminada exitosamente`, 'Éxito', 3000);
        dispatch({type: SET_DATA_TABLE_HOMEWORK, dataTableHomework: response.homework})
    })
    .catch(error => {
        console.log(`error deleteHomework:`, error)
        NotificationManager.error(`Error al eliminar tarea`, 'ERROR', 0);
    })
}

//-----------------------------------------------------
//Funciones para calificar las tareas
export const listHomeworkForNote = (id) => (dispatch) => {
    const data = {homework: id}

    api.post('/homework_student/homework_note', data).then(response => {
        NotificationManager.success('Tareas para calificar listadas', 'Éxito', 3000);
        console.log('datos de listHomeworkForNote:', response)
        dispatch({type: SET_DATA_HOMEWORK_NOTE, dataHomeworkNote: response.homework_student})
        dispatch({type: SET_HOMEWORK_STUDENT_NOTE, dataHomeworkStudentNote: null})
    })
    .catch(error => {
        console.log('error listHomeworkForNote:', error)
        NotificationManager.error('Error al listar tareas para calificar', 'ERROR', 0);        
    })
}

export const readHomeworkForNote = (idhw, ids) => (dispatch) => {
    const data = {homework: idhw, student: ids}

    api.post('/homework_student/read_homework_note', data).then(response => {
        NotificationManager.info('Detalles de tarea para calificar', 'Éxito', 3000);
        console.log('datos de readHomeworkForNote:', response)
        dispatch(initializeForm("homework_note_form", {points: response.homework_student.points}))
        dispatch({type: SET_HOMEWORK_STUDENT_NOTE, dataHomeworkStudentNote: response.homework_student})
    })
    .catch(error => {
        console.log('error readHomeworkForNote:', error)
        NotificationManager.error('Error al leer detalles de la tarea para calificar', 'ERROR', 0);        
    })
}

export const qualifyHomework = (idhw, ids, points, id) => (dispatch) => {
    const data = {homework: idhw, student: ids, points}

    api.post('/homework_student/qualify_homework', data).then(response => {
        NotificationManager.info('Calificación guardada correctamente', 'Éxito', 3000);
        console.log('datos de qualifyHomework:', response)
        dispatch(push(`/my_assignment_prof/${id}/homework/${idhw}`))
    })
    .catch(error => {
        console.log('error qualifyHomework:', error)
        NotificationManager.error('Error guardar calificación de la tarea', 'ERROR', 0);        
    })
}


export const actions = {    
    myAssignmentsProf,
    updateStudentAssign,
    studentSelect,
    readNameCurrentAssign,
    listStudentCurrentAssing,
    clearForm,
    clearFormMaterial,
    registerMaterial,
    listCurrentMaterial,
    editMaterial,
    updateMaterial,
    deleteMaterial,
    clearFormHomework,
    registerHomework,
    listCurrentHomework,
    editHomework,
    updateHomework,
    deleteHomework,
    listHomeworkForNote,
    readHomeworkForNote,
    qualifyHomework
};

export const initialState = {
    loader: false,
    data: null,
    oneData: null,
    assignmentsProf: null,
    me: stateLogin.me,
    currentStudents: null,
    currentFormMaterial: null,
    dataTableMaterial: null,
    dataFormHomework: null,
    dataTableHomework: null,
    dataHomeworkNote: null,
    dataHomeworkStudentNote: null
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
    [ASSIGNMENTS_OF_PROFESSOR]: (state, { assignmentsProf }) => {
        return {
            ...state,
            assignmentsProf,
        };
    },
    [LIST_CURRENT_STUDENTS]: (state, { currentStudents }) => {
        return {
            ...state,
            currentStudents,
        };
    },
    [SET_DATA_TABLE_MATERIAL]: (state, { dataTableMaterial }) => {
        return {
            ...state,
            dataTableMaterial,
        };
    },
    [SET_FORM_MATERIAL]: (state, { currentFormMaterial }) => {
        return {
            ...state,
            currentFormMaterial,
        };
    },
    [SET_DATA_TABLE_HOMEWORK]: (state, { dataTableHomework }) => {
        return {
            ...state,
            dataTableHomework,
        };
    },
    [SET_FORM_HOMEWORK]: (state, { dataFormHomework }) => {
        return {
            ...state,
            dataFormHomework,
        };
    },
    [SET_DATA_HOMEWORK_NOTE]: (state, { dataHomeworkNote }) => {
        return {
            ...state,
            dataHomeworkNote,
        };
    },
    [SET_HOMEWORK_STUDENT_NOTE]: (state, { dataHomeworkStudentNote }) => {
        return {
            ...state,
            dataHomeworkStudentNote,
        };
    },
};

export default handleActions(reducers, initialState);