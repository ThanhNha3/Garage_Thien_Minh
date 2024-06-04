import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCustomerByZaloId = createAsyncThunk(
  "users/fetchCustomerByZaloId",
  async (zalo_id) => {
    const response = await fetch(
      `http://localhost:4000/api/customers/${zalo_id}`
    );
    const data = await response.json();
    return data;
  }
);

export const fetchAllCustomer = createAsyncThunk(
  "users/fetchAllCustomer",
  async () => {
    const response = await fetch(`http://localhost:4000/api/customers`);
    const data = await response.json();
    return data;
  }
);

export const customerSlice = createSlice({
  name: "products",
  initialState: {
    customer: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerByZaloId.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerByZaloId.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload[0]);
        state.customer = action.payload[0];
      })
      .addCase(fetchCustomerByZaloId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const {} = customerSlice.actions;
export default customerSlice.reducer;
