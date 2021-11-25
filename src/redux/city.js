import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    city : "" , 
}

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
  
    updateCity: (state, action) => {
      state.city = action.payload; 
    },
  },
})

// Action creators are generated for each case reducer function
export const {updateCity } = citySlice.actions

export default citySlice.reducer