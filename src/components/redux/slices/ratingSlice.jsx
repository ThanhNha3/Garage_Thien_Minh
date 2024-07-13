import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllRating = createAsyncThunk(
  "users/fetchAllRating",
  async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/ratings`);
    const data = await response.json();
    return data;
  }
);

export const fetchRatingByAppointmentId = createAsyncThunk(
  "users/fetchRatingByAppointmentId",
  async (appointment_id) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/ratings/appointment=${appointment_id}`
    );
    const data = await response.json();
    return data;
  }
);

export const insertRating = createAsyncThunk(
  "users/insertRating",
  async (ratingData) => {
    const { rating_value, rating_status, appointment_id } = ratingData;
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/ratings/appointment=${appointment_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating_value,
          rating_status,
          appointment_id,
        }),
      }
    );
    const data = await response.json();
    return data;
  }
);

export const ratingSlice = createSlice({
  name: "products",
  initialState: {
    rating: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatingByAppointmentId.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRatingByAppointmentId.fulfilled, (state, action) => {
        state.loading = false;
        state.rating = action.payload[0];
      })
      .addCase(fetchRatingByAppointmentId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(insertRating.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertRating.fulfilled, (state, action) => {
        state.loading = false;
        // state.rating = action.payload[0];
      })
      .addCase(insertRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const {} = ratingSlice.actions;
export default ratingSlice.reducer;
