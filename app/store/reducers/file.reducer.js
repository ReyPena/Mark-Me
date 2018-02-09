import {
  NAME_SET,
  DIRECTORY_SET,
  PATH_SET
} from '../constants';

const INITIAL_STATE = {
  path: '',
  name: 'New File',
  dir: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PATH_SET:
      return { ...state, path: action.payload };
    case NAME_SET:
      return { ...state, name: action.payload };
    case DIRECTORY_SET:
      return { ...state, dir: action.payload };
    default:
      return state;
  }
}
