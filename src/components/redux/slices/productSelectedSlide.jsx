import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const productSelectedSlice = createSlice({
  name: "productsSelected",
  initialState: {
    productsSelected: [],
    loading: false,
    error: null,
  },
  reducers: {
    selectProduct: (state, action) => {
      state.productsSelected.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.productsSelected = state.productsSelected.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

// Export actions and reducer
export const { selectProduct, removeProduct } = productSelectedSlice.actions;
export default productSelectedSlice.reducer;
