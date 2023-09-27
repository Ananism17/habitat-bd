import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../components/Services/Utilities";

const initialState = {
  path: null
};

const menuPath = (state, action) => {
  return updateObject(state, {
    path: action.path
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MENU_PATH:
      return menuPath(state, action);
    default:
      return state;
  }
};

export default reducer;
