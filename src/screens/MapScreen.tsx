import { View, Text } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import Map from "../components/Map";
import MapView from "react-native-maps";
import MapNavigator from "../navigator/MapNavigator";

const MapScreen = () => {
  const tw = useTailwind();
  return (
    <View>
      <View style={tw("h-1/2")}>
        <Map />
      </View>
      <View style={tw("h-1/2")}>
        <MapNavigator />
      </View>
    </View>
  );
};

export default MapScreen;
