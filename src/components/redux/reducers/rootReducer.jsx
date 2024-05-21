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
import CustomerInformationReducer from "./customerInformationReducer";
import ListTimePickerReducer from "./listTimePickerReducer";
import BranchChosenReducer from "./branchChosenReducer";
import RatingAppointmentReducer from "./ratingAppointmentReducer";

export const rootReducer = combineReducers({
  productsSelected: ProductsSelectedReducer,
  products: ProductReducer,
  coupons: CouponReducer,
  appointments: AppointmentReducer,
  branches: BranchReducer,
  branchChosen: BranchChosenReducer,
  categories: CategoryReducer,
  users: UserReducer,
  staffChosen: StaffChosenReducer,
  datePicker: DatePickerReducer,
  listTimePicker: ListTimePickerReducer,
  timePicker: TimePickerReducer,
  customerInformation: CustomerInformationReducer,
  ratings: RatingAppointmentReducer,
});
