import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/change_password/change_password';
import PasswordChange from './PasswordChange';


const ms2p = (state) => {
  return {
    ...state.change_password,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(PasswordChange);
