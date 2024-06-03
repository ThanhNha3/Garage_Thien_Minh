import { rootReducer } from "./reducers/rootReducer";
import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/productSlice";
import appointmentReducer from "./slices/appointmentSlide";
import branchReducer from "./slices/branchSlide";
import categoryReducer from "./slices/categorySlide";
import productSelectedReducer from "./slices/productSelectedSlide";
import staffReducer from "./slices/staffSlide";
import datePickerReducer from "./slices/datePickerSlide";
import timeSlotReducer from "./slices/timeSlotSlide";
import timeSlotPickerReducer from "./slices/timeSlotPickerSlide";
import staffChosenReducer from "./slices/staffChosenSlide";
import customerInformationReducer from "./slices/customerInformationSlide";

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
  },
});

export default Store;
