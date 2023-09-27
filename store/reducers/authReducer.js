import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../components/Services/Utilities";

const initialState = {
  token: null,
  user: null,
};

const authLogin = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    user: action.user,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, user: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN:
      return authLogin(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
