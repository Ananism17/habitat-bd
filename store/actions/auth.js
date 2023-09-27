import axios from "axios";
import * as actionTypes from "./actionTypes";
import Router from "next/router";
import { BASE_URL } from "../../base";


export const authLogin = (token, user) => {
  Router.push({
    pathname: "/admin",
  });
  return {
    type: actionTypes.AUTH_LOGIN,
    idToken: token,
    user: user,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};


export const auth = (email, password) => {
  return (dispatch) => {
    const apiUrl = BASE_URL + "api/v1/auth/login";
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axios
      .post(apiUrl, authData)
      .then((response) => {
        if (response.data.status) {
          dispatch(
            authLogin(
              response.data.access_token,
              response.data.user,
            )
          );

        } else {
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

 

export const menuPath = (path) => {
  return {
    type: actionTypes.MENU_PATH,
    path: path,
  };
}