import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/productSlice";
import appointmentReducer from "./slices/appointmentSlice";
import branchReducer from "./slices/branchSlice";
import categoryReducer from "./slices/categorySlice";
import productSelectedReducer from "./slices/productSelectedSlice";
import staffReducer from "./slices/staffSlice";
import datePickerReducer from "./slices/datePickerSlice";
import timeSlotReducer from "./slices/timeSlotSlice";
import timeSlotPickerReducer from "./slices/timeSlotPickerSlice";
import staffChosenReducer from "./slices/staffChosenSlice";
import customerInformationReducer from "./slices/customerInformationSlice";
import customerReducer from "./slices/customerSlice";
import ratingReducer from "./slices/ratingSlice";
import appointmentDetailReducer from "./slices/appointmentDetailSlice";

export const Store = configureStore({
  reducer: {
    products: productReducer,
    appointments: appointmentReducer,
    branches: branchReducer,
    categories: categoryReducer,
    productsSelected: productSelectedReducer,
    staffs: staffReducer,
    datePicker: datePickerReducer,
    timeSlots: timeSlotReducer,
    timeSlotPicker: timeSlotPickerReducer,
    staffChosen: staffChosenReducer,
    customerInformation: customerInformationReducer,
    customer: customerReducer,
    rating: ratingReducer,
    appointmentDetail: appointmentDetailReducer
  },
});

export default Store;
