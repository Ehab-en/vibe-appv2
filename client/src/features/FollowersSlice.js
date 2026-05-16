import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {

    followersCount: 0,

    followingCount: 0,

    followers: [],

    following: [],

    isLoading: false,

    isError: false

};

// ================= FOLLOW =================

export const toggleFollow =
    createAsyncThunk(

        "followers/toggleFollow",

        async ({
            followerEmail,
            followingEmail
        }) => {

            const res =
                await axios.post(

                    "https://vibe-appv2.onrender.com/follow",

                    {
                        followerEmail,
                        followingEmail
                    }

                );

            return res.data;

        }

    );

// ================= GET FOLLOWERS =================

export const getFollowers =
    createAsyncThunk(

        "followers/getFollowers",

        async (email) => {

            const res =
                await axios.get(
                    `https://vibe-appv2.onrender.com/followers/${email}`
                );

            return res.data;

        }

    );

// ================= SLICE =================

const FollowerSlice =
    createSlice({

        name: "followers",

        initialState,

        reducers: {},

        extraReducers: (builder) => {

            builder

                // ✅ GET FOLLOWERS
                .addCase(
                    getFollowers.pending,

                    (state) => {

                        state.isLoading =
                            true;

                    }
                )

                .addCase(
                    getFollowers.fulfilled,

                    (state, action) => {

                        state.isLoading =
                            false;

                        state.followersCount =
                            action.payload.followersCount;

                        state.followingCount =
                            action.payload.followingCount;

                        state.followers =
                            action.payload.followers;

                        state.following =
                            action.payload.following;

                    }
                )

                .addCase(
                    getFollowers.rejected,

                    (state) => {

                        state.isLoading =
                            false;

                        state.isError = true;

                    }
                )

                // ✅ FOLLOW / UNFOLLOW
                .addCase(
                    toggleFollow.pending,

                    (state) => {

                        state.isLoading =
                            true;

                    }
                )

                .addCase(
                    toggleFollow.fulfilled,

                    (state) => {

                        state.isLoading =
                            false;

                    }
                )

                .addCase(
                    toggleFollow.rejected,

                    (state) => {

                        state.isLoading =
                            false;

                        state.isError = true;

                    }
                );

        }

    });

export default
    FollowerSlice.reducer;