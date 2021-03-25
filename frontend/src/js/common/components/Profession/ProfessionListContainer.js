import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/profession/profession';
import ProfessionList from './ProfessionList';


const ms2p = (state) => {
  return {
    ...state.profession,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ProfessionList);
