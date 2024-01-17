import { GET_COMMENTS } from "../actions/comment.action";

const inialState = {};

export default function commentReducer(state = inialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.playload;
    default:
      return state;
  }
}
