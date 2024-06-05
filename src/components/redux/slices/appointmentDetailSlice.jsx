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
      })
      .addCase(insertNewDetailAppointment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.isInsert = true;
      })
      .addCase(insertNewDetailAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.insertId = action.payload.insertId;
        state.isInsert = false;
      })
      .addCase(insertNewDetailAppointment.rejected, (state, action) => {
        state.loading = false;
        state.isInsert = false;
        state.error = action.error.message;
      });
  },
});

export const {} = appointmentDetailSlice.actions;
export default appointmentDetailSlice.reducer;
