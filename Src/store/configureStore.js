import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import { getUser } from "../actions/user.action";
import { getComment } from "../actions/comment.action";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

store.dispatch(getUser());
store.dispatch(getComment());

export default store;
