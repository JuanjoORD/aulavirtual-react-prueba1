import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/student/student';
import StudentCreate from './StudentCreate';


const ms2p = (state) => {
  return {
    ...state.student,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(StudentCreate);
