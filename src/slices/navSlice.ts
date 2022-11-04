import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";
import { TravelResponse } from "../utils/fetchTravelData";

export type Origin = {
  lat: number;
  lng: number;
};

export type TravelTime = {
  distance: { text: string; value: number };
  duration: { text: string; value: number };
  status: string;
};

export interface Navigation {
  origin: { location: Origin; description: string } | null;
  destination: { location: Origin; description: string } | null;
  travelTimeInformation: TravelTime | null;
}

const initialState: Navigation = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInformation } =
  navSlice.actions;

// selectors

export const selectOrigin = (state: RootState) => state.nav.origin;
export const selecDestination = (state: RootState) => state.nav.destination;
export const selectTravelTimeInformation = (state: RootState) =>
  state.nav.travelTimeInformation;

export default navSlice.reducer;
