import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "./city";
import resultsReducer from "./ApiResults";
export const store = configureStore({
  reducer: {
    city: cityReducer,
    results: resultsReducer,
  },
});
