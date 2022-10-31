import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

export class Navigation {
  origin: string | null = null;
  destination: string | null = null;
  travelTimeInformation: string | null = null;
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
