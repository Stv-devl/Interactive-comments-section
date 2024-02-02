import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "../actions/user.action";
import updateState from "./updateState";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
      return updateState(state, { loading: true, error: null });
    case GET_USER_SUCCESS:
      return updateState(state, {
        loading: false,
        user: action.payload,
        error: null,
      });
    case GET_USER_FAILURE:
      return updateState(state, {
        loading: false,
        user: null,
        error: action.payload,
      });
    default:
      return state;
  }
}
