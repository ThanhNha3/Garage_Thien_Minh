import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllBranches = createAsyncThunk(
  "users/fetchAllBranches",
  async () => {
    const response = await fetch("http://localhost:4000/api/branches");
    const data = await response.json();
    return data;
  }
);

export const branchSlide = createSlice({
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
export const {} = branchSlide.actions;
export default branchSlide.reducer;
