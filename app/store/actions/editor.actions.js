import pathParse from "path-parse";

import {
  TEXT_CHANGED,
  THEME_CHANGED,
  NAME_SET,
  DIRECTORY_SET,
  PATH_SET
} from '../constants';

/**
 * Change Theme
 * @param textMd
 * @returns {{type, payload: *}}
 */
export const textChanged = (textMd) => {
  return {
    type: TEXT_CHANGED,
    payload: textMd
  };
};

/**
 * Set Theme
 * @returns {{type}}
 */
export const changeTheme = () => {
  return {
    type: THEME_CHANGED
  }
};

/**
 * Parse system path
 * @param str
 * @returns {function(*)}
 */
export const setFilePath = (str) => {
  const path = pathParse(str);

  return (dispatch) => {
    dispatch({
      type: NAME_SET,
      payload: path.base
    });

    dispatch({
      type: DIRECTORY_SET,
      payload: path.dir
    });

    dispatch({
      type: PATH_SET,
      payload: str
    });
  };
};
