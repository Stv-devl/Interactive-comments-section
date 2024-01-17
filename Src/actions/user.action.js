import axios from "axios";

export const GET_USER = "GET_USER";

export const getUser = () => {
  return (dispatch) => {
    return axios.get("http://localhost:3001/currentUser").then((res) => {
      dispatch({ type: GET_USER, playload: res.data });
    });
  };
};
