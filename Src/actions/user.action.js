import axios from "axios";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const getUser = () => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const res = await axios.get("http://localhost:3001/currentUser");
      dispatch({ type: GET_USER_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: GET_USER_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };
};
