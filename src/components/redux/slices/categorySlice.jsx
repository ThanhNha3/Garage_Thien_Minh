import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllCategories = createAsyncThunk(
  "users/fetchAllCategories",
  async () => {
    const response = await fetch("http://127.0.0.1:8000/api/categories");
    const data = await response.data.json();
    return data.data;
  }
);

export const branchSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // update products array
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const {} = branchSlice.actions;
export default branchSlice.reducer;
