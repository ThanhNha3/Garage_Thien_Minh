import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAppointmentDetailbyId = createAsyncThunk(
  "users/fetchAppointmentDetailbyId",
  async (appointment_id) => {
    appointment_id = Number(appointment_id);
    const response = await fetch(
      `http://127.0.0.1:8000/api/appointment/detail/${appointment_id}`
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
  reducers: {
    setAppoinmentToDefault: (state) => {
      state.appointment = {};
    },
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
      })
      
  },
});

export const {setAppoinmentToDefault} = appointmentDetailSlice.actions;
export default appointmentDetailSlice.reducer;
