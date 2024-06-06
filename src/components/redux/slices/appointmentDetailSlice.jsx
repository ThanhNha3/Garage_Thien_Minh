import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAppointmentDetailbyId = createAsyncThunk(
  "users/fetchAppointmentDetailbyId",
  async (appointment_id) => {
    appointment_id = Number(appointment_id);
    const response = await fetch(
      `http://localhost:4000/api/appointments/detail/${appointment_id}`
    );
    const data = await response.json();
    return data;
  }
);

export const insertNewDetailAppointment = createAsyncThunk(
  "users/insertNewDetailAppointment",
  async (request) => {
    const {
      appointment_id,
      time_picker_id,
      customer_name,
      customer_email,
      customer_address,
      customer_phone,
      customer_note,
      services_id,
    } = request;
    const response = await fetch(
      `http://localhost:4000/api/appointments/detail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointment_id,
          time_picker_id,
          customer_name,
          customer_email,
          customer_address,
          customer_phone,
          customer_note,
          services_id,
        }),
      }
    );
    const data = await response.json();
    return data;
  }
);

export const appointmentDetailSlice = createSlice({
  name: "appointments",
  initialState: {
    appointment: {},
    loading: false,
    error: null,
    insertId: null,
    isInsert: true,
    isComplete: false,
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
      .addCase(insertNewDetailAppointment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.isInsert = true;
        state.isComplete = false;
      })
      .addCase(insertNewDetailAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.isInsert = false;
        state.isComplete = true;
      })
      .addCase(insertNewDetailAppointment.rejected, (state, action) => {
        state.loading = false;
        state.isInsert = false;
        state.error = action.error.message;
        state.isComplete = false;
      });
  },
});

export const {setAppoinmentToDefault} = appointmentDetailSlice.actions;
export default appointmentDetailSlice.reducer;
