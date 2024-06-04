import { createSlice } from "@reduxjs/toolkit";

export const customerInformationSlice = createSlice({
  name: "customerInformation",
  initialState: {
    customerInformation: {},
    loading: false,
    error: null,
  },
  reducers: {
    updateCustomerInformation: (state, action) => {
      state.customerInformation = action.payload;
    },
  },
});

// Export actions and reducer
export const { updateCustomerInformation } = customerInformationSlice.actions;
export default customerInformationSlice.reducer;
