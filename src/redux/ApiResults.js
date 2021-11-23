import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  results: [],
};

export const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    updateResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateResults } = resultsSlice.actions;

export default resultsSlice.reducer;
