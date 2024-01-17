import { GET_USER } from "../actions/user.action";

const inialState = {};

export default function userReducer(state = inialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.playload;
    default:
      return state;
  }
}
