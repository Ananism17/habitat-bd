import * as actionTypes from "./actionTypes";

export const popUp = () => {
  return {
    type: actionTypes.SHOW_POPUP,
    show: false,
  };
};
