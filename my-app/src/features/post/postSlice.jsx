import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "@/services/community/PostService";

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const data = await postApi.getAllPost();
  return data;
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData) => {
    return await postApi.addPost(postData);
  }
);

const updatedPost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, postData }) => {
    const updatedPost = await postApi.updatePost(id, postData);
    return { id, ...updatedPost };
  }
);

const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await postApi.deletePost(id);
  return id;
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    updatePostLikes: (state, action) => {
      const { postId, likesCount } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.likesCount = likesCount;
      }
    },
    // updatePostLikes: (state, action) => {
    //   const { postId, likesCount } = action.payload;
    //   const post = state.posts.find((p) => p.id === postId);
    //   if (post) {
    //     post.likesCount = likesCount;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // create
      .addCase(createPost.fulfilled, (state, action) => {
        console.log(action);
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // update
      .addCase(updatedPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatedPost.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // deleter
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { updatePostLikes } = postSlice.actions;
export default postSlice.reducer;
// export const {  fetchPosts } = postSlice.actions;
