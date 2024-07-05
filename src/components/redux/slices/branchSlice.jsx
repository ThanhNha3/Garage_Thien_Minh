import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllBranches = createAsyncThunk(
  "users/fetchAllBranches",
  async () => {
    const response = await fetch("http://127.0.0.1:8000/api/branches");
    const data = await response.json();
    return data.data;
  }
);

export const branchSlice = createSlice({
  name: "branches",
  initialState: {
    branches: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBranches.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload; // update products array
      })
      .addCase(fetchAllBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const {} = branchSlice.actions;
export default branchSlice.reducer;
