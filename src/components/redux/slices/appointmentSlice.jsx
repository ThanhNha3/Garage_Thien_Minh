import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useContext } from "react";
import { dataContext } from "../../providerContext/providerContext";

export const fetchAllAppointments = createAsyncThunk(
  "users/fetchAllAppointments",
  async () => {
    const response = await fetch(
      `http://localhost:4000/api/appointments/3368637342326461234`
    );
    const data = await response.json();
    return data;
  }
);

export const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAppointments.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {} = appointmentSlice.actions;
export default appointmentSlice.reducer;
