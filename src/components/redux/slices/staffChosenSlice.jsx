import { createSlice } from "@reduxjs/toolkit";

export const staffChosenSlice = createSlice({
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
export const { changeStaffChosen } = staffChosenSlice.actions;
export default staffChosenSlice.reducer;
