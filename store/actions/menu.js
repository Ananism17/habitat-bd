import * as actionTypes from "./actionTypes";

export const menuPath = (path) => {
  return {
    type: actionTypes.MENU_PATH,
    path: path,
  };
};
