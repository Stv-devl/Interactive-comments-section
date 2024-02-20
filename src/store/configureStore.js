import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import { getUser } from "../actions/user.action";
import { getComments } from "../actions/comment.action";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

store.dispatch(getUser());
store.dispatch(getComments());

export default store;
