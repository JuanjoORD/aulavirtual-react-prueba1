import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/grade/grade';
import GradeCreate from './GradeCreate';


const ms2p = (state) => {
  return {
    ...state.grade,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(GradeCreate);
