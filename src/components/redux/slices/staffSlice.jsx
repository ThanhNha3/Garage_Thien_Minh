import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllStaffs = createAsyncThunk(
  "users/fetchAllStaffs",
  async () => {
    const response = await fetch("http://127.0.0.1:8000/api/staffs");
    const data = await response.json();
    return data.data.map((item) => {
      return item.role === 0 ? item : null;
    });
  }
);

export const fetchAllStaffsTransfer = createAsyncThunk(
  "users/fetchAllStaffs",
  async () => {
    const response = await fetch("http://127.0.0.1:8000/api/staffs");
    const data = await response.json();
    return data.data;
  }
);

export const staffSlice = createSlice({
  name: "products",
  initialState: {
    staffs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStaffs.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStaffs.fulfilled, (state, action) => {
        state.loading = false;
        state.staffs = action.payload;
      })
      .addCase(fetchAllStaffs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const {} = staffSlice.actions;
export default staffSlice.reducer;
