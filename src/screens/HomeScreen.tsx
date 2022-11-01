import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import NavOptions from "../components/NavOptions";

const HomeScreen = () => {
  const tw = useTailwind();
  return (
    <SafeAreaView style={tw("bg-white h-full")}>
      <View style={tw("p-5")}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />
        <NavOptions />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
