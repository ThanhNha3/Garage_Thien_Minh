import { createSlice } from "@reduxjs/toolkit";

export const staffChosenSlide = createSlice({
  name: "staffChosen",
  initialState: {
    staffChosen: {},
    loading: false,
    error: null,
  },
  reducers: {
    changeStaffChosen: (state, action) => {
      state.staffChosen = action.payload;
    },
  },
});

// Export actions and reducer
export const { changeStaffChosen } = staffChosenSlide.actions;
export default staffChosenSlide.reducer;
