import { rootReducer } from "./reducers/rootReducer";
import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/productSlice";
import appointmentReducer from "./slices/appointmentSlide";
import branchReducer from "./slices/branchSlide";

export const Store = configureStore({
  reducer: {
    products: productReducer,
    appointments: appointmentReducer,
    branches: branchReducer,
  },
});

export default Store;
