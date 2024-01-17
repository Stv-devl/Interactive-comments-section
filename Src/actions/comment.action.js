import axios from "axios";

export const GET_COMMENTS = "GET_COMMENTS";

export const getComment = () => {
  return (dispatch) => {
    return axios.get("http://localhost:3001/comments").then((res) => {
      dispatch({ type: GET_COMMENTS, playload: res.data });
    });
  };
};
