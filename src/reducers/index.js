import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import commentReducer from "./comment.reducer";
export default combineReducers({
  //REDUCERS
  userReducer,
  commentReducer,
});
