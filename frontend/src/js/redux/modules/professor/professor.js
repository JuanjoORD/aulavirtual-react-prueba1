import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

import { assignmentSelect, registerAssignProfessor, updateAssignProfessor, clearForm } from "../assignment_professor/assignment_professor"

const LIST_PROFESSOR = 'LIST_PROFESSOR'
const READ_PROFESSOR = 'READ_PROFESSOR'
const MY_ASSIGNMENTS = "MY_ASSIGNMENTS" 

const GENDER_OPTIONS = [
    'Masculino',
    'Femenino'
]

const formatData = (data) => {
    return {
        user: {
            username: data.username,
            first_name: data.first_name,
            last_name: data.last_name,
            password: data.password,
            email: data.email
        },
        role: 2,
        profession: data.profession.value,
        profile: {
            phone: data.phone,
            address: data.address,
            gender: data.gender.value
        }
    }
}

export const setMyAssignments = myAssignmentsData => ({
    type: MY_ASSIGNMENTS,
    myAssignmentsData,
});

export const readProfessor = (id) => (dispatch) => {
    api.get(`/professor/${id}`).then(response => {        

        let data = {}
        if(response){
            data = {
                id: response.id,
                first_name: response.profile.user.first_name,
                last_name: response.profile.user.last_name,
                avatar: response.profile.avatar,
                phone: response.profile.phone,
                address: response.profile.address,
                gender: {label: GENDER_OPTIONS[response.profile.gender], value: response.profile.gender },
                profession: {
                    label: response.profession.name,
                    value: response.profession.id
                },
                username: response.profile.user.username,
                password: '',
                confirmPassword: '',
                email: response.profile.user.email
            }
        }

        console.log('read professor response:', data)
        dispatch({type: READ_PROFESSOR, oneData: data})
        dispatch(initializeForm('professor_form', data))
    })
    .catch(error => {
        console.log('error professor:', error)
        NotificationManager.error('Error al leer al profesor', 'ERROR', 0);
    })
}

export const listProfessor = () => (dispatch) => {
    api.get('/professor').then(response => {
        console.log('professor list', response)
        dispatch({type: LIST_PROFESSOR, data: response})
        dispatch({type: READ_PROFESSOR, oneData: null})
    })
    .catch(error => {
        console.log('error professor:', error)
        NotificationManager.error('Error al listar profesores', 'ERROR', 0);
    })
}

export const registerProfessor = (data={}, attachments=[]) => (dispatch, getStore) => {        
    const sendData = formatData(data)
    console.log('professor register:', sendData)
    console.log('professor register ONLY DATA:', data)        

    api.postAttachments('/professor', sendData, attachments).then(response => {
        NotificationManager.success('Profesor creado exitosamente', 'Éxito', 3000);
        dispatch(push('/professor'))
    })
    .catch(error => {
        console.log('error professor:', error)
        if(error.detail){
            NotificationManager.error(error.detail, 'ERROR', 0);
        }
        else{
            NotificationManager.error('Error al registrar al profesor', 'ERROR', 0);
        }
    })
}

export const updateProfessor = (data={}, attachments=[]) => (dispatch, getStore) => {    
    //const data = getStore().form.student_form.values
    const id = data.id

    const sendData = formatData(data)

    console.log('update professor sendData:', sendData)
    console.log('update professor data:', data)
    console.log('update professor attachments:', attachments)    

    api.putAttachments(`/professor/${id}`, sendData, attachments).then(response => {
        NotificationManager.success('Profesor actualizado exitosamente', 'Éxito', 3000);
        dispatch(push('/professor'))
    })
    .catch(error => {
        console.log('error professor update:', error)
        if(error.detail){
            NotificationManager.error(error.detail, 'ERROR', 0);
        }
        else{
            NotificationManager.error('Error al actualizar profesor', 'ERROR', 0);
        }
    })
}

export const deleteProfessor = (id) => (dispatch) => {
    console.log('delete professor', id)
    
    api.eliminar(`/professor/${id}`).then(response => {
        NotificationManager.success('Profesor eliminado exitosamente', 'Éxito', 3000);
        dispatch(listProfessor())
    })
    .catch(error => {
        console.log('error professor:', error)
        NotificationManager.error('Error al eliminar profesor', 'ERROR', 0);
    })
}

//**PROFESIONES PARA SELECT */
export const professionGet = (search) => () => {    
    return api.get('/profession', (search)).then(response => {            

        let professionOptions = []                     
        if(response){
            professionOptions = response.results.map(p => {
                return { value: p.id, label: p.name }
            });            
        }         
        return professionOptions
    })
    .catch(error => {
        console.log('error profesion:', error)
        NotificationManager.error('Error al listar profesiones', 'ERROR', 0);        
        return []
    })    
}

export const myAssignments = (id) => (dispatch) => {
    const data = {id: id}
    api.post(`assignment_professor/myAssignments`, data).then(response => {        
        const dataMyAssignments = response.myAssignments.map(e => {
            const format = {
                id: e.id,
                value: e.id,
                label: `${e.assignment.course.name}, ${e.assignment.grade.name}, ${e.assignment.section.name}`
            }
            return format
        })
        console.log(`read myAssignments:`, dataMyAssignments)
        
        dispatch({type: MY_ASSIGNMENTS, myAssignmentsData: dataMyAssignments})
    })
    .catch(error => {
        console.log(`error read myAssignments:`, error)
        NotificationManager.error(`Error al leer mis asignaturas`, 'ERROR', 0);
    })
}

export const existAssignProf = (idProfessor, idAssignment) => () => {
    const data = {
        idProfessor,
        idAssignment
    }

    api.post(`assignment_professor/existAssignProf`, data).then(response => {        
        
        console.log(`read existAssignProf:`, response)
        return response.exist        
    })
    .catch(error => {
        console.log(`error read existAssignProf:`, error)
        NotificationManager.error(`Error al verificar si existe relación`, 'ERROR', 0);
    })
}

export const actions = {
    registerProfessor,
    listProfessor,
    readProfessor,
    updateProfessor,
    deleteProfessor,
    professionGet,
    assignmentSelect,
    registerAssignProfessor,
    updateAssignProfessor,
    clearForm,
    myAssignments,
    existAssignProf
};

export const initialState = {
    loader: false,
    data: null,
    oneData: null,
    myAssignmentsData: null 
};

export const reducers = {
    [LIST_PROFESSOR]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [READ_PROFESSOR]: (state, { oneData }) => {
        return {
            ...state,
            oneData,
        };
    },
    [MY_ASSIGNMENTS]: (state, { myAssignmentsData }) => {
        return {
            ...state,
            myAssignmentsData,
        };
    },
};

export default handleActions(reducers, initialState);