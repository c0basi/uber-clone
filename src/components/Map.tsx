import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { useTailwind } from "tailwind-rn/dist";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selecDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_KEY } from "@env";
import { fetchTravelData } from "../utils/fetchTravelData";

const Map = () => {
  const tw = useTailwind();
  const origin = useAppSelector(selectOrigin);
  const destination = useAppSelector(selecDestination);
  const dispatch = useAppDispatch();
  const mapref = useRef<any>(null);

  useEffect(() => {
    if (!origin || !destination) return;

    //Zoom and fit to markers
    mapref.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [
    origin?.location.lat,
    origin?.location.lng,
    destination?.location.lat,
    destination?.location.lng,
  ]);

  useEffect(() => {
    if (!origin || !destination) return;
    const fetchTravel = async () => {
      const travelData = await fetchTravelData(
        origin.description,
        destination.description
      );
      console.log("texting");

      console.log(travelData);
      dispatch(setTravelTimeInformation(travelData.rows[0].elements[0]));
    };
    fetchTravel();

    // dispatch(setTravelTimeInformation(travelData.rows[0].element));
  }, [origin?.description, destination?.description]);
  return (
    <>
      {origin && (
        <MapView
          ref={mapref}
          style={tw("flex-1")}
          initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {origin && destination && (
            <MapViewDirections
              origin={origin.description}
              destination={destination.description}
              apikey={API_KEY}
              strokeWidth={3}
              strokeColor="black"
            />
          )}
          <Marker
            title="Origin"
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            description={origin.description}
            identifier={"origin"}
          />
          {destination?.location && (
            <Marker
              title="Destination"
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              description={destination.description}
              identifier={"destination"}
            />
          )}
        </MapView>
      )}
    </>
  );
};

export default Map;
