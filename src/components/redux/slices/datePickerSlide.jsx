import { createSlice } from "@reduxjs/toolkit";

export const datePickerSlide = createSlice({
  name: "datePicker",
  initialState: {
    datePicker: new Date().toISOString(),
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
export const { changeDatePicker } = datePickerSlide.actions;
export default datePickerSlide.reducer;
