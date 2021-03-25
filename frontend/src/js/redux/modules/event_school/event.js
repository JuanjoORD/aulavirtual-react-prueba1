import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LIST = 'LIST'
const READ = "READ"

export const listEvent = () => (dispatch) => {
    api.get("/event").then(response => {
        console.log("response list Event:", response)
        dispatch({type: LIST, data: response})
        dispatch({type: READ, oneData: null})
    })
    .catch(error => {
        console.log(`error listEvent:`, error)
        NotificationManager.error(`Error al listar los eventos`, 'ERROR', 0);
    })
}

export const editEvent = (id) => (dispatch) => {
    api.get(`/event/${id}`).then(response => {
        console.log("response edit Event:", response)
        NotificationManager.info(`Detalles del evento obtenidos correctamente`, 'Éxito', 3000);
        dispatch({type: READ, oneData: response})
        dispatch(initializeForm('event_form', response))
    })
    .catch(error => {
        console.log(`error eidt Event:`, error)
        NotificationManager.error(`Error al obtener datos del evento`, 'ERROR', 0);
    })
}

export const deleteEvent = (id) => (dispatch) => {
    api.eliminar(`/event/${id}`).then(response => {
        console.log("response delete Event:", response)
        NotificationManager.success(`Evento eliminado correctamente`, 'Éxito', 3000);
        dispatch(listEvent())
    })
    .catch(error => {
        console.log(`error delete Event:`, error)
        NotificationManager.error(`Error al intentar eliminar el evento`, 'ERROR', 0);
    })
}

export const registerEvent = () => (dispatch, getStore) => {
    const data = getStore().form.event_form.values
    console.log("DATA OF registerEvent:", data)

    api.post("/event", data).then(response => {
        console.log("response register Event:", response)
        NotificationManager.success(`Evento registrado correctamente`, 'Éxito', 3000);
        dispatch(push("/event"))
    })
    .catch(error => {
        console.log(`error register Event:`, error)
        NotificationManager.error(`Error al registrar evento`, 'ERROR', 0);
    })
}

export const updateEvent = () => (dispatch, getStore) => {
    const data = getStore().form.event_form.values
    console.log("DATA OF update Event:", data)

    api.put(`/event/${data.id}`, data).then(response => {
        console.log("response update Event:", response)
        NotificationManager.success(`Evento actualizado correctamente`, 'Éxito', 3000);
        dispatch(push("/event"))
    })
    .catch(error => {
        console.log(`error update Event:`, error)
        NotificationManager.error(`Error al actualizar el evento`, 'ERROR', 0);
    })
}


export const actions = {    
    listEvent,
    registerEvent,
    updateEvent,
    editEvent,
    deleteEvent
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