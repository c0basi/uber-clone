import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";

export type MapStackParamsList = {
  NavigateCard: undefined;
  RideOptionsCard: undefined;
};

const MapStack = createNativeStackNavigator<MapStackParamsList>();

const MapNavigator = () => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name="NavigateCard"
        component={NavigateCard}
        options={{ headerShown: false }}
      />
      <MapStack.Screen
        name="RideOptionsCard"
        component={RideOptionsCard}
        options={{ headerShown: false }}
      />
    </MapStack.Navigator>
  );
};

export default MapNavigator;

const styles = StyleSheet.create({});
