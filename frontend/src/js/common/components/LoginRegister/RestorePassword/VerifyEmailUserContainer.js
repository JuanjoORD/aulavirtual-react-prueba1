import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/cuenta/restore_password';
import VerifyEmailUser from './VerifyEmailUser';


const ms2p = (state) => {
  return {
    ...state.restore_password,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(VerifyEmailUser);
