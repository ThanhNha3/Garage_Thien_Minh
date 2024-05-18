import { rootReducer } from "./reducers/rootReducer";
import { createStore } from "@reduxjs/toolkit";

const Store = createStore(rootReducer);

export default Store;
