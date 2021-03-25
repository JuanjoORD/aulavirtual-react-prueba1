import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/home_admin/home_admin';
import HomeAdmin from './HomeAdmin';


const ms2p = (state) => {
  return {
    ...state.home_admin,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(HomeAdmin);
