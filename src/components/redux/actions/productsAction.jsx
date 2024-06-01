import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProductRequest = async () => {
  return {
    type: "getting_product_request",
  };
};

export const getProductSucess = async () => {
  return {
    type: "getting_product_success",
  };
};

export const getProductFail = async () => {
  return {
    type: "getting_product_fail!",
  };
};

export const fetchAllProducts = () => {
  // The `extraArgument` is the third arg for thunk functions
  return async (dispatch, getState) => {
    dispatch(getProductRequest());
    try {
      const res = await fetch("http://127.0.0.1:8000/api/thien-minh/home");
      const data = await res.json();
      if (data) {
        dispatch(getProductSucess());
        console.log(data);
      }
    } catch (err) {
      dispatch(getProductFail());

      console.log(err);
    }
  };
};
