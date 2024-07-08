import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllAppointments = createAsyncThunk(
  "users/fetchAllAppointments",
  async (zalo_id) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/appointments/zalo=${zalo_id}`
    );
    const data = await response.json();
    return data.data;
  }
);

export const cancelAppointment = createAsyncThunk(
  "users/cancelAppointment",
  async (id) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/appointment/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: 2,
        }),
      }
    );
    const data = await response.json();
    return data;
  }
);

export const insertNewAppointment = createAsyncThunk(
  "users/insertNewAppointment",
  async (request) => {
    const {
      zalo_id,
      branch_id,
      employee_id,
      appointment_date,
      appointment_details,
    } = request;
    const response = await fetch(`http://127.0.0.1:8000/api/appointment/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        zalo_id,
        branch_id,
        employee_id,
        appointment_date,
        status: 0,
        appointment_details,
      }),
    });
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
      })
      .addCase(cancelAppointment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;
        // state.appointments = action.payload;
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(insertNewAppointment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertNewAppointment.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(insertNewAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default appointmentSlice.reducer;
