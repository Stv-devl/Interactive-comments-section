import axios from "axios";

export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const SET_LOADING = " SET_LOADING";
export const SET_ERROR = " SET_ERROR";

export const getComments = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const res = await axios.get("http://localhost:3001/comments");
      dispatch({ type: GET_COMMENTS, payload: res.data });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.response ? error.response.data : error.message,
      });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
};

export const addComment = (data, commentId) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });

    const baseUrl = "http://localhost:3001/";
    const url = !commentId
      ? `${baseUrl}comments`
      : commentId === "3"
      ? `${baseUrl}comments/2/replies`
      : `${baseUrl}comments/${commentId}/replies`;

    try {
      const res = await axios.post(url, data);
      dispatch({ type: ADD_COMMENT, payload: res.data });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.response ? error.response.data : error.message,
      });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
};

export const editComment = (data, replyTo) => {
  const commentId = data.id;

  return async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const res = await axios.put(
        `http://localhost:3001/searchById/${commentId}`,
        data
      );
      dispatch({ type: EDIT_COMMENT, payload: { ...res.data, replyTo } });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.response ? error.response.data : error.message,
      });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
};

export const deleteComment = (dataId) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      await axios.delete(`http://localhost:3001/searchById/${dataId}`);
      dispatch({ type: DELETE_COMMENT, payload: dataId });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.response ? error.response.data : error.message,
      });
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
};
