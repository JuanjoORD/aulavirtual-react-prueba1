import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/course/course';
import CourseCreate from './CourseCreate';


const ms2p = (state) => {
  return {
    ...state.course,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CourseCreate);
