import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notifications: [],
  isLoading: false,
  isSuccess: false,
  isError: false
};

// GET NOTIFICATIONS
export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",

  async (email) => {

    const res = await axios.get(
      `https://vibe-appv2.onrender.com/notifications/${email}`
    );

    return res.data.notifications;

  }
);

const NotificationsSlice = createSlice({

  name: "notifications",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      // GET NOTIFICATIONS
      .addCase(getNotifications.pending, (state) => {

        state.isLoading = true;

      })

      .addCase(getNotifications.fulfilled, (state, action) => {

        state.isLoading = false;
        state.isSuccess = true;

        state.notifications = action.payload;

      })

      .addCase(getNotifications.rejected, (state) => {

        state.isLoading = false;
        state.isError = true;

      });

  }

});

export default NotificationsSlice.reducer;