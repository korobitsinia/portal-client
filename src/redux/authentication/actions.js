import axios from "axios";
import { addResponseLog } from "../responseLog/action";

const baseUrl = "http://192.168.10.111/api/auth/";

export const registrationAction = (data) => {
  return async (dispatch) => {
    let { status, message } = (await axios.post(`${baseUrl}registration`, data))
      .data;
    dispatch(addResponseLog({ status, message }));
  };
};

export const auth = (obj) => {
  return async (dispatch) => {
    let { status, message, payload } = (await axios.post(`${baseUrl}`, obj))
      .data;
    dispatch(addResponseLog({ status, message }));
    if (status === 200) {
      dispatch(authLoginAction(payload));
    }
  };
};

export const logOutAction = () => {
  return (dispatch) => {
    dispatch(
      addResponseLog({ status: "200", message: "Вы вышли из учетной записи" })
    );
    dispatch(authLogoutAction());
  };
};

const authLoginAction = (obj) => ({
  type: "AUTH_LOGIN",
  payload: obj,
});
const authLogoutAction = () => ({
  type: "LOGOUT",
});
