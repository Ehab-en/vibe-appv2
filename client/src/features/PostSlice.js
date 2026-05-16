import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  message: "",
  isLoading: false,
  isSuccess: false,
  isError: false
};

// ✅ GET POSTS
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async () => {
    const res = await axios.get("https://vibe-appv2.onrender.com/posts");
    return res.data.posts;
  }
);

// ✅ CREATE POST
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData) => {
    const res = await axios.post("https://vibe-appv2.onrender.com/posts", postData);
    return res.data.message;
  }
);

// ✅ TOGGLE LIKE
export const toggleLike = createAsyncThunk(
  "posts/toggleLike",
  async ({ postId, userEmail }) => {
    const res = await axios.post("https://vibe-appv2.onrender.com/like", {
      postId,
      userEmail
    });

    return {
      postId,
      likes: res.data.likes
    };
  }
);

// ✅ ADD COMMENT
export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, userEmail, username, profilepic, text }) => {
    const res = await axios.post("https://vibe-appv2.onrender.com/comment", {
      postId,
      userEmail,
      username,
      profilepic,
      text
    });

    return { postId, comments: res.data.comments };
  }
);

const PostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder

      // 🔥 GET POSTS
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // 🔥 CREATE POST
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createPost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // 🔥 TOGGLE LIKE
      .addCase(toggleLike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.isLoading = false;

        const { postId, likes } = action.payload;

        const post = state.posts.find((p) => p._id === postId);

        if (post) {
          post.likes = likes;
        }
      })
      .addCase(toggleLike.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // 🔥 ADD COMMENT (THIS WAS MISSING)
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;

        const { postId, comments } = action.payload;

        const post = state.posts.find((p) => p._id === postId);

        if (post) {
          post.comments = comments;
        }
      })
      .addCase(addComment.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

  }
});

export default PostSlice.reducer;