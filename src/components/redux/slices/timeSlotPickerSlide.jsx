import { createSlice } from "@reduxjs/toolkit";

export const timeSlotPickerSlice = createSlice({
  name: "timeSlotsPicker",
  initialState: {
    timeSlotPicker: 1,
    loading: false,
    error: null,
  },
  reducers: {
    changeTimePicker: (state, action) => {
      state.timeSlotPicker = action.payload.id;
    },
  },
});

// Export actions and reducer
export const { changeTimePicker } = timeSlotPickerSlice.actions;
export default timeSlotPickerSlice.reducer;
