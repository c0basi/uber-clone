import { API_KEY } from "@env";
import axios from "axios";

export type TravelResponse = {
  destination_addresses: string[];
  origin_addresses: string[];
  rows: {
    elements: [
      {
        distance: { text: string; value: number };
        duration: { text: string; value: number };
        status: string;
      }
    ];
  }[];
};

export const fetchTravelData = async (origin: string, destination: string) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=${API_KEY}`
    );
    return response.data as unknown as TravelResponse;
  } catch (err) {
    console.log("error here");
    console.log(err);
    throw new Error("invalid request");
  }
};
