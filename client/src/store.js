import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/UserSlice";
import postReducer from "./features/PostSlice";
import followerReducer from './features/FollowersSlice'
import notificationsReducer from "./features/NotificationsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    followers: followerReducer,
    notifications: notificationsReducer,
  }
});