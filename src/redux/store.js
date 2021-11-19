import { configureStore } from '@reduxjs/toolkit'
import cityReducer from './city'
export const store = configureStore({
  reducer: {
    city: cityReducer,
  },
})
