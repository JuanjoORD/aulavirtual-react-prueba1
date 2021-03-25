import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/assignment_professor/assignment_for_professor';
import HomeProfessor from './HomeProfessor';


const ms2p = (state) => {
  return {
    ...state.assignment_for_professor,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(HomeProfessor);
