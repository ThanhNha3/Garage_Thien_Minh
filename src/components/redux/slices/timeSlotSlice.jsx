import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllTimeSlots = createAsyncThunk(
  "users/fetchAllTimeSlots",
  async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/timeslots`);
    const data = await response.json();
    return data;
  }
);

export const timeSlotSlice = createSlice({
  name: "timeSlots",
  initialState: {
    timeSlots: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTimeSlots.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTimeSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.timeSlots = action.payload;
      })
      .addCase(fetchAllTimeSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const {} = timeSlotSlice.actions;
export default timeSlotSlice.reducer;
