import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LIST_STUDENT = 'LIST_STUDENT'
const READ_STUDENT = 'READ_STUDENT' 

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
        role: 3,        
        profile: {
            phone: data.phone,
            address: data.address,
            gender: data.gender.value            
        },
        student: {
            card_id: data.card_id || '',
            contact_name: data.contact_name,
            contact_phone: data.contact_phone,
            contact_address: data.contact_address
        },
        avatar: null
    }
}

export const readStudent = (id) => (dispatch) => {
    api.get(`/student/${id}`).then(response => {        

        let data = {}
        if(response){
            data = {
                id: response.id,
                first_name: response.profile.user.first_name,
                last_name: response.profile.user.last_name,
                phone: response.profile.phone,
                address: response.profile.address,
                gender: {label: GENDER_OPTIONS[response.profile.gender], value: response.profile.gender },                
                username: response.profile.user.username,
                password: '',
                confirmPassword: '',
                email: response.profile.user.email,
                avatar: response.profile.avatar,
                card_id: response.card_id,
                contact_address: response.contact_address,
                contact_name: response.contact_name,
                contact_phone: response.contact_phone
            }
        }

        console.log('read student response:', data)
        dispatch({type: READ_STUDENT, oneData: data})
        dispatch(initializeForm('student_form', data))
    })
    .catch(error => {
        console.log('error student:', error)
        NotificationManager.error('Error al leer estudiante', 'ERROR', 0);
    })
}

export const listStudent = () => (dispatch) => {
    api.get('/student').then(response => {
        console.log('student list', response)
        dispatch({type: LIST_STUDENT, data: response})
        dispatch({type: READ_STUDENT, oneData: null})
    })
    .catch(error => {
        console.log('error student list:', error)
        NotificationManager.error('Error al listar estudiantes', 'ERROR', 0);
    })
}

export const registerStudent = (data={}, attachments=[]) => (dispatch, getStore) => {        
    const sendData = formatData(data)
    console.log('student register:', sendData)
    console.log('student register ONLY DATA:', data)        

    api.postAttachments('/student', sendData, attachments).then(response => {
        NotificationManager.success('Estudiante creado exitosamente', 'Éxito', 3000);
        dispatch(push('/student'))
    })
    .catch(error => {
        console.log('error student:', error)
        if(error.detail){
            NotificationManager.error(error.detail, 'ERROR', 0);
        }
        else{
            NotificationManager.error('Error al registrar al estudiante', 'ERROR', 0);
        }
    })
}

export const updateStudent = (data={}, attachments=[]) => (dispatch, getStore) => {    
    //const data = getStore().form.student_form.values
    const id = data.id

    const sendData = formatData(data)

    console.log('update student sendData:', sendData)
    console.log('update student data:', data)
    console.log('update student attachments:', attachments)    

    api.putAttachments(`/student/${id}`, sendData, attachments).then(response => {
        NotificationManager.success('Estudiante actualizado exitosamente', 'Éxito', 3000);
        dispatch(push('/student'))
    })
    .catch(error => {
        console.log('error student update:', error)
        if(error.detail){
            NotificationManager.error(error.detail, 'ERROR', 0);
        }
        else{
            NotificationManager.error('Error al actualizar estudiante', 'ERROR', 0);
        }
    })
}

export const deleteStudent = (id) => (dispatch) => {
    console.log('delete professor', id)
    
    api.eliminar(`/student/${id}`).then(response => {
        NotificationManager.success('Estudiante eliminado exitosamente', 'Éxito', 3000);
        dispatch(listProfessor())
    })
    .catch(error => {
        console.log('error student delete:', error)
        NotificationManager.error('Error al eliminar estudiante', 'ERROR', 0);
    })
}

const cancelEditStudent = () => (dispatch) => {
    dispatch({type: READ_STUDENT, oneData: null})
    dispatch(push('/student'))
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

export const actions = {
    readStudent,
    registerStudent,
    deleteStudent,
    listStudent,
    updateStudent,
    cancelEditStudent
};

export const initialState = {
    loader: false,
    data: null,
    oneData: null   
};

export const reducers = {
    [LIST_STUDENT]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [READ_STUDENT]: (state, { oneData }) => {
        return {
            ...state,
            oneData,
        };
    },
};

export default handleActions(reducers, initialState);