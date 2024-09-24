import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../constants";

// Create user & Login
export const authenticateUser = createAsyncThunk(
  "authenticateUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/${data.authMode}`, {
        username: data.username,
        password: data.password,
      });
      return response.data.userDetails;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    user: {},
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userDetail.actions;

export default userDetail.reducer;
