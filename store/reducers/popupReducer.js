import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../components/Services/Utilities";

const initialState = {
  show: true,
};

const popUp = (state, action) => {
  return updateObject(state, {
    show: action.show,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_POPUP:
      return popUp(state, action);
    default:
      return state;
  }
};

export default reducer;
