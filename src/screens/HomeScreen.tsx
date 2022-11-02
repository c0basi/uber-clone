import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { API_KEY } from "@env";
import { useAppDispatch } from "../redux/hooks";
import { setDestination, setOrigin } from "../slices/navSlice";

const HomeScreen = () => {
  const tw = useTailwind();
  const dispatch = useAppDispatch();
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
        <GooglePlacesAutocomplete
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            console.log(typeof details?.geometry.location);

            console.log(details?.geometry.location, data.description);

            dispatch(
              setOrigin({
                location: details?.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          minLength={2}
          enablePoweredByContainer={false}
          placeholder="Where from"
          query={{ key: API_KEY, language: "en" }}
        />
        <NavOptions />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
