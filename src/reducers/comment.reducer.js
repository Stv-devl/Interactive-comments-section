import {
  GET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SET_LOADING,
  SET_ERROR,
} from "../actions/comment.action";
import updateState from "./updateState";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return updateState(state, {
        loading: false,
        comments: action.payload,
        error: null,
      });
    case ADD_COMMENT:
      return updateState(state, {
        comments: [action.payload, ...state.comments],
        error: null,
      });
    case EDIT_COMMENT: {
      const { id, replyTo, ...updatedComment } = action.payload;

      const updatedComments = state.comments.map((comment) => {
        if (comment.id === id && !replyTo) {
          return { ...comment, ...updatedComment };
        }
        if (comment.user.username === replyTo) {
          const updatedReplies = comment.replies.map((reply) =>
            reply.id === id ? { ...reply, ...updatedComment } : reply
          );
          return { ...comment, replies: updatedReplies };
        }
        return comment;
      });
      return { ...state, comments: updatedComments, error: null };
    }
    case DELETE_COMMENT: {
      const idToDelete = action.payload;

      const updatedComments = state.comments.reduce((acc, comment) => {
        if (comment.id === idToDelete) {
          return acc;
        }
        if (
          comment.replies &&
          comment.replies.some((reply) => reply.id === idToDelete)
        ) {
          const updatedReplies = comment.replies.filter(
            (reply) => reply.id !== idToDelete
          );

          acc.push({ ...comment, replies: updatedReplies });
        } else {
          acc.push(comment);
        }

        return acc;
      }, []);

      return { ...state, comments: updatedComments, error: null };
    }

    case SET_LOADING:
      return updateState(state, { loading: action.payload });
    case SET_ERROR:
      return updateState(state, { error: action.payload });
    default:
      return state;
  }
}
