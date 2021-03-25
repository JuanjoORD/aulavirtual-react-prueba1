import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/school_cycle/school_cycle';
import CycleList from './CycleList';


const ms2p = (state) => {
  return {
    ...state.cycle,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CycleList);
