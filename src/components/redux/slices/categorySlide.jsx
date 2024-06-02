import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllCategories = createAsyncThunk(
  "users/fetchAllCategories",
  async () => {
    const response = await fetch("http://localhost:4000/api/categories");
    const data = await response.json();
    return data;
  }
);

export const branchSlide = createSlice({
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
export const {} = branchSlide.actions;
export default branchSlide.reducer;
