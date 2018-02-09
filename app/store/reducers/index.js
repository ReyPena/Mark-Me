import { combineReducers } from 'redux';

import EditorReducer from './editor.reducer';
import FileReducer from './file.reducer';

const reducers = combineReducers({
  file: FileReducer,
  editor: EditorReducer,
});

export default reducers;
