import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAppointmentDetailbyId = createAsyncThunk(
  "users/fetchAppointmentDetailbyId",
  async (appointment_id) => {
    appointment_id = Number(appointment_id);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/appointment/detail/${appointment_id}`
    );
    const data = await response.json();
    return data.data;
  }
);

export const appointmentDetailSlice = createSlice({
  name: "appointments",
  initialState: {
    appointment: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointmentDetailbyId.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointmentDetailbyId.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload[0];
      })
      .addCase(fetchAppointmentDetailbyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default appointmentDetailSlice.reducer;
