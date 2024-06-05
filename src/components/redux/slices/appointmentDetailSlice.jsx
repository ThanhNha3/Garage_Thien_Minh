import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetAppointmentDetailbyId = createAsyncThunk(
  "users/fetAppointmentDetailbyId",
  async (appointment_id) => {
    const response = await fetch(
      `  http://localhost:4000/api/appointments/detail/${appointment_id}`
    );
    const data = await response.json();
    return data;
  }
);

export const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointment: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetAppointmentDetailbyId.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetAppointmentDetailbyId.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload[0];
      })
      .addCase(fetAppointmentDetailbyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {} = appointmentSlice.actions;
export default appointmentSlice.reducer;
