import { dialog } from 'electron';

import {
  OPEN_FILE,
  SAVE_FILE
} from "../app/store/constants";

/**
 * Open File
 * @param ipc
 */
export const open = (ipc) => {
  const options = {
    properties: [ 'openFile' ],
    filters: [
      {name: 'All Files', extensions: ['md']}
    ]
  };

  dialog.showOpenDialog(null, options, (file) => {
    if(file) {
      ipc.send(OPEN_FILE, file[0]);
    }
  });
};


/**
 * Save File
 * @param ipc
 */
export const save = (ipc) => {
  const options = {
    filters: [
      {name: 'All Files', extensions: ['md']}
    ]
  };

  dialog.showSaveDialog(null, options, (file) => {
    if(file) {
      ipc.send(SAVE_FILE, file);
    }
  });
};