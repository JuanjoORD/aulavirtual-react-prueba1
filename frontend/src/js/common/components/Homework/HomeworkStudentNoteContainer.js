import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/assignment_student/assignment_student';
import HomeworkStudentNoteCreate from './HomeworkStudentNoteCreate';


const ms2p = (state) => {
  return {
    ...state.assignment_student,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(HomeworkStudentNoteCreate);
