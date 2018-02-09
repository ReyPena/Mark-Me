import {
  TEXT_CHANGED,
  THEME_CHANGED
} from '../constants';

const INITIAL_STATE = {
  theme: 'dark',
  mdText: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEXT_CHANGED:
      return { ...state, mdText: action.payload };
    case THEME_CHANGED:
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
    default:
      return state;
  }
}
