import axios from "axios";
import { addResponseLog } from "../responseLog/action";

const baseUrl = "http://192.168.10.111/api/orders/";

export const downloadActiveOrders = () => {
  return async (dispatch) => {
    const { status, payload } = (await axios.get(`${baseUrl}`)).data;
    if (status === 200) {
      dispatch(setActiveOrdersData(payload));
    }
  };
};

const setActiveOrdersData = (obj) => ({
  type: "ORDERS_SET_ACTIVE_ORDERS",
  payload: obj,
});

export const createNewOrder = (newOrderData, token = null) => {
  return async (dispatch) => {
    let { status, message } = (
      await axios.post(`${baseUrl}`, newOrderData, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;
    dispatch(addResponseLog({ status, message }));
    if (status === 200) {
      dispatch(downloadActiveOrders());
    }
  };
};

export const updateOrder = (obj, token) => {
  return async (dispatch) => {
    let { status, message } = (
      await axios.put(`${baseUrl}`, obj, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;
    dispatch(addResponseLog({ status, message }));
    if (status === 200) {
      dispatch(downloadActiveOrders());
    }
  };
};

export const deleteOrder = (id, token) => {
  return async (dispatch) => {
    const { status, message } = (
      await axios.delete(`${baseUrl}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;
    dispatch(addResponseLog({ status, message }));
    if (status === 200) {
      dispatch(downloadActiveOrders());
    }
  };
};

export const completeOrder = (obj, token) => {
  return async (dispatch) => {
    let { status, message } = (
      await axios.put(`${baseUrl}complete`, obj, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;
    dispatch(addResponseLog({ status, message }));
    if (status === 200) {
      dispatch(downloadActiveOrders());
    }
  };
};

export const downloadArchiveOrders = () => {
  return async (dispatch) => {
    const { status, payload } = (await axios.get(`${baseUrl}archive`)).data;
    if (status === 200) {
      dispatch(setArchiveOrdersData(payload));
    }
  };
};

const setArchiveOrdersData = (obj) => ({
  type: "ORDERS_SET_ARCHIVE_ORDERS",
  payload: obj,
});

export const returnFromArchive = (obj, token) => {
  return async (dispatch) => {
    let { status, message } = await axios.put(`${baseUrl}archive`, obj, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(addResponseLog({ status, message }));
    if (status === 200) {
      dispatch(downloadActiveOrders());
    }
  };
};
