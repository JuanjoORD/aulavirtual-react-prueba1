import Swal from 'sweetalert2';
import {handleActions} from 'redux-actions';
import {NotificationManager} from 'react-notifications';


export const handleSubmit = () => (dispatch, getStore) => {
    const store = getStore();
    const notiForm = store.form.notificacioForm.values;
    switch (notiForm.typeNoti) {
    case 'info':
        NotificationManager.info(notiForm.mensaje, notiForm.titulo);
        break;
    case 'success':
        NotificationManager.success(notiForm.mensaje, notiForm.titulo);
        break;
    case 'warning':
        NotificationManager.warning(notiForm.mensaje, notiForm.titulo, 3000);
        break;
    case 'error':
        NotificationManager.error(notiForm.mensaje, notiForm.titulo, 5000, () => {
            alert('callback');
        });
        break;
    default:
        break;
    }
};

export const showSweet = () => (dispatch, getStore) => {
    const store = getStore();
    const notiForm = store.form.notificacioSweetForm.values;
    switch (notiForm.typeNoti) {
    case 'success':
        Swal.fire('Exito!',
            'El proceso se ha realizado con exito!',
            notiForm.typeNoti);
        break;
    case 'error':
        Swal.fire({
            type: notiForm.typeNoti,
            title: 'Uupssss',
            text: 'Ha ocurrido un error!',
            footer: '<a href="/" >Podemos ayudarte?</a>',
        });
        break;
    case 'info':
        Swal.fire('Informacion!',
            'Esto es un ejemplo de sweet2!',
            notiForm.typeNoti);
        break;
    case 'warning':
        Swal.fire({
            title: 'Seguro que desea eliminarlo?',
            text: "Si realiza esta accion no se podra revertir!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
        }).then((result) => {
            if (result.value) {
                Swal.fire('Exito!', 'El registro ha sido borrado.', 'success');
            }
        });
        break;
    default:
        break;
    }
};

export const actions = {
    handleSubmit,
    showSweet,
};

export const reducers = {};

export const initialState = {};

export default handleActions(reducers, initialState);
