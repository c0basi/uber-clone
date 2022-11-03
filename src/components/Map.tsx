import { View, Text } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { useTailwind } from "tailwind-rn/dist";
import { useAppSelector } from "../redux/hooks";
import { selectOrigin } from "../slices/navSlice";
import { SafeAreaView } from "react-native-safe-area-context";

const Map = () => {
  const tw = useTailwind();
  const origin = useAppSelector(selectOrigin);
  return (
    <>
      {origin && (
        <MapView
          style={tw("flex-1")}
          initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            title="Origin"
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            description={origin.description}
            identifier={"origin"}
          />
        </MapView>
      )}
    </>
  );
};

export default Map;
