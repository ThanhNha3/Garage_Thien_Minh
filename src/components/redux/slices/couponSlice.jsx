import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllCoupons = createAsyncThunk(
  "users/fetchAllCoupons",
  async () => {
    const response = await fetch("http://127.0.0.1:8000/api/promotions");
    const data = await response.json();
    return data.data;
  }
);

export const couponSlice = createSlice({
  name: "coupons",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCoupons.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // update products array
      })
      .addCase(fetchAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const { } = couponSlice.actions;
export default couponSlice.reducer;
