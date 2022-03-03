import axios from "axios";
import { addResponseLog } from "../responseLog/action";

const baseUrl = "http://192.168.10.111/api/phonebook/";

export const downloadDepartmentData = (id) => {
  return async (dispatch) => {
    const { status, payload } = (await axios.get(`${baseUrl}${id}`)).data;
    if (status === 200) {
      dispatch(setDepartmentData({ id, payload }));
    }
  };
};

const setDepartmentData = (obj) => ({
  type: "PHB_DEPARTMENT_DATA",
  payload: obj,
});

export const phonebookCreatePerson = (newPersonData, token = null) => {
  return async (dispatch) => {
    let { status, message, payload } = (
      await axios.post(`${baseUrl}`, newPersonData, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;
    dispatch(addResponseLog({ status, message }));
    if (status === 200) {
      dispatch(downloadDepartmentData(payload[0].dep));
    }
  };
};

export const phonebookUpdatePerson = (id, dep, newPersonData, token) => {
  return async (dispatch) => {
    let { status, message } = (
      await axios.put(
        `${baseUrl}`,
        { id, ...newPersonData },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    ).data;
    dispatch(addResponseLog({ status, message }));
    if (status === 200) {
      dispatch(downloadDepartmentData(dep));
    }
  };
};

export const phonebookDeletePerson = (id, dep, token) => {
  return async (dispatch) => {
    const { status, message } = (
      await axios.delete(`${baseUrl}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;
    dispatch(addResponseLog({ status, message }));
    if (status === 200) {
      dispatch(deletePerson(id, dep));
    }
  };
};

const deletePerson = (id, dep) => ({
  type: "PHB_DELETE_PERSON",
  payload: { id, dep },
});

export const setActiveDepartment = (id) => ({
  type: "PHB_ACTIVE_DEPARTMENT",
  payload: id,
});

export const downloadAllPeople = () => {
  return async (dispatch) => {
    const { status, payload } = (await axios.get(baseUrl)).data;
    if (status === 200) {
      dispatch(setAllPeopleData(payload));
    }
  };
};

const setAllPeopleData = (array) => ({
  type: "PHB_ALL_PEOPLE_DATA",
  payload: array,
});

export const changeSearchValue = (obj) => ({
  type: "PHB_SEARCH_VALUE",
  payload: obj,
});
