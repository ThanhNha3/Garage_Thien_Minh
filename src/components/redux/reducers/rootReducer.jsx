import { combineReducers } from "redux";
import ProductReducer from "./productReducer";
import CouponReducer from "./couponReducer";
import AppointmentReducer from "./appointmentReducer";
import BranchReducer from "./branchReducer";
import ProductsSelectedReducer from "./productsSelectedReducer";
import CategoryReducer from "./categoryReducer";
import UserReducer from "./userReducer";
import StaffChosenReducer from "./staffChosenReducer";
import DatePickerReducer from "./datePickerReducer";
import TimePickerReducer from "./timePickerReducer";

export const rootReducer = combineReducers({
  productsSelected: ProductsSelectedReducer,
  products: ProductReducer,
  coupons: CouponReducer,
  appointments: AppointmentReducer,
  branches: BranchReducer,
  categories: CategoryReducer,
  users: UserReducer,
  staffChosen: StaffChosenReducer,
  datePicker: DatePickerReducer,
  timePicker: TimePickerReducer,
});
