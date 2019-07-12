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

export const actions = {
    handleSubmit,
};

export const reducers = {};

export const initialState = {};

export default handleActions(reducers, initialState);
