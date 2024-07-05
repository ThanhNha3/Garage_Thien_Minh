import { createSlice } from "@reduxjs/toolkit";

export const timeSlotPickerSlice = createSlice({
  name: "timeSlotsPicker",
  initialState: {
    timeSlotPicker: {
      id: 1,
      time: "",
    },
    loading: false,
    error: null,
  },
  reducers: {
    changeTimePicker: (state, action) => {
      state.timeSlotPicker = {
        id: action.payload.id,
        time: action.payload.start_time,
      };
    },
  },
});

// Export actions and reducer
export const { changeTimePicker } = timeSlotPickerSlice.actions;
export default timeSlotPickerSlice.reducer;
