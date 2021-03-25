import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/level/level';
import LevelCreate from './LevelCreate';


const ms2p = (state) => {
  return {
    ...state.level,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(LevelCreate);
