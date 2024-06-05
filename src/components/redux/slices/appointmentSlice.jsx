import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllAppointments = createAsyncThunk(
  "users/fetchAllAppointments",
  async (zalo_id) => {
    const response = await fetch(
      `http://localhost:4000/api/appointments/3368637342326461234`
    );
    const data = await response.json();
    return data;
  }
);

export const cancelAppointment = createAsyncThunk(
  "users/cancelAppointment",
  async (id) => {
    const response = await fetch(
      `http://localhost:4000/api/appointments/cancel/${id}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    return data;
  }
);

export const insertNewAppointment = createAsyncThunk(
  "users/insertNewAppointment",
  async (request) => {
    const { zalo_id, branch_id, employee_id, appointment_date } = request;
    const response = await fetch(`http://localhost:4000/api/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        zalo_id,
        branch_id,
        employee_id,
        appointment_date,
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
    insertId: null,
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
        state.insertId = action.payload.insertId;
        // state.appointments = action.payload;
      })
      .addCase(insertNewAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {} = appointmentSlice.actions;
export default appointmentSlice.reducer;
