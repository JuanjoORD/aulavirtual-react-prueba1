import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/assignment/assignment';
import AssignmentList from './AssignmentList';


const ms2p = (state) => {
  return {
    ...state.assignment,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(AssignmentList);
