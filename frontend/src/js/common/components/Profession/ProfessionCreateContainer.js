import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/profession/profession';
import ProfessionCreate from './ProfessionCreate';


const ms2p = (state) => {
  return {
    ...state.profession,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ProfessionCreate);
