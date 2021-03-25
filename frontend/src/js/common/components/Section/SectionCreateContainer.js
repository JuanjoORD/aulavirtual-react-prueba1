import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/section/section';
import SectionCreate from './SectionCreate';


const ms2p = (state) => {
  return {
    ...state.section,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(SectionCreate);
