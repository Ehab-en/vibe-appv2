import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import axios from "axios";

// ✅ SAFE USER LOAD
let userFromStorage = null;

try {

  const storedUser =
    localStorage.getItem("user");

  userFromStorage =

    storedUser &&
    storedUser !== "undefined"

      ? JSON.parse(storedUser)

      : null;

}

catch (error) {

  userFromStorage = null;

}

const initialState = {

  user:
    userFromStorage,

  message: "",

  isLoading: false,

  isSuccess: false,

  isError: false

};

// ✅ REGISTER
export const addUser =
  createAsyncThunk(

    "user/addUser",

    async (userData) => {

      try {

        const response =
          await axios.post(

            "https://vibe-appv2.onrender.com/register",

            userData

          );

        return response.data.message;

      }

      catch (error) {

        throw error;

      }

    }

  );

// ✅ LOGIN
export const login =
  createAsyncThunk(

    "user/login",

    async (userData) => {

      try {

        const response =
          await axios.post(

            "https://vibe-appv2.onrender.com/login",

            userData

          );

        return response.data;

      }

      catch (error) {

        throw error;

      }

    }

  );

export const UserSlice =
  createSlice({

    name: "user",

    initialState,

    reducers: {

      // ✅ SET USER
      setUser: (
        state,
        action
      ) => {

        state.user =
          action.payload;

        localStorage.setItem(

          "user",

          JSON.stringify(
            action.payload
          )

        );

      },

      // ✅ LOGOUT / CLEAR USER
      clearUser: (
        state
      ) => {

        state.user = null;

        localStorage.removeItem(
          "user"
        );

      }

    },

    extraReducers: (builder) => {

      builder

        // ✅ REGISTER
        .addCase(

          addUser.pending,

          (state) => {

            state.isLoading = true;

          }

        )

        .addCase(

          addUser.fulfilled,

          (state, action) => {

            state.isLoading = false;

            state.message =
              action.payload;

            state.isSuccess = false;

          }

        )

        .addCase(

          addUser.rejected,

          (state) => {

            state.isLoading = false;

            state.isError = true;

          }

        )

        // ✅ LOGIN
        .addCase(

          login.pending,

          (state) => {

            state.isLoading = true;

          }

        )

        .addCase(

          login.fulfilled,

          (state, action) => {

            state.isLoading = false;

            state.message =
              action.payload.message;

            // ✅ LOGIN SUCCESS
            if (
              action.payload.message ===
              "success"
            ) {

              state.isSuccess = true;

              state.user =
                action.payload.user;

              localStorage.setItem(

                "user",

                JSON.stringify(
                  action.payload.user
                )

              );

            }

            // ❌ LOGIN FAILED
            else {

              state.isSuccess = false;

              state.user = null;

            }

          }

        )

        .addCase(

          login.rejected,

          (state) => {

            state.isLoading = false;

            state.isError = true;

          }

        );

    }

  });

// ✅ EXPORT ACTIONS
export const {

  setUser,

  clearUser

} = UserSlice.actions;

// ✅ EXPORT REDUCER
export default UserSlice.reducer;