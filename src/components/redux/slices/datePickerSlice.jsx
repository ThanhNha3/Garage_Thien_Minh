import { createSlice } from "@reduxjs/toolkit";

export const datePickerSlice = createSlice({
  name: "datePicker",
  initialState: {
    datePicker: new Date().toLocaleString("vi-EN"),
    loading: false,
    error: null,
  },
  reducers: {
    changeDatePicker: (state, action) => {
      state.datePicker = action.payload;
    },
  },
});

// Export actions and reducer
export const { changeDatePicker } = datePickerSlice.actions;
export default datePickerSlice.reducer;
