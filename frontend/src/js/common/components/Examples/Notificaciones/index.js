import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/notificaciones/notificaciones';
import Notificaciones from './Notificaciones';


const ms2p = (state) => {
    return { ...state.notificaciones };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Notificaciones);
