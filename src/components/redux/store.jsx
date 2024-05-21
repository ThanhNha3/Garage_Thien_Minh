import { rootReducer } from "./reducers/rootReducer";
import { configureStore } from "@reduxjs/toolkit";

const Store = configureStore({
  reducer: rootReducer,
});

export default Store;
