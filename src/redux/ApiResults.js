import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  results: {
    coord: {
      lon: -76.5074,
      lat: 38.3004,
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01n",
      },
    ],
    base: "stations",
    main: {
      temp: 2.75,
      feels_like: 276.75,
      temp_min: 274.23,
      temp_max: 278.97,
      pressure: 1023,
      humidity: 48,
    },
    visibility: 10000,
    wind: {
      speed: 0.89,
      deg: 296,
      gust: 1.34,
    },
    clouds: {
      all: 1,
    },
    dt: 1637711004,
    sys: {
      type: 2,
      id: 2011802,
      country: "US",
      sunrise: 1637668585,
      sunset: 1637704140,
    },
    timezone: -18000,
    id: 4350049,
    name: "California",
    cod: 200,
  },
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
