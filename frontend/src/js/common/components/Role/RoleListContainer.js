import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/role/role';
import RoleList from './RoleList';


const ms2p = (state) => {
  return {
    ...state.role,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(RoleList);
