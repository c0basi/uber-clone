import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import { SafeAreaView } from "react-native-safe-area-context";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { API_KEY } from "@env";
import { useAppDispatch } from "../redux/hooks";
import { setDestination } from "../slices/navSlice";
import {
  useNavigation,
  CompositeNavigationProp,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { MapStackParamsList } from "../navigator/MapNavigator";
import NewFavorites from "./NewFavorites";
import { Icon } from "@rneui/themed";

export type NavigateCardRouteProps = CompositeNavigationProp<
  NativeStackNavigationProp<MapStackParamsList, "NavigateCard">,
  NativeStackNavigationProp<RootStackParamList>
>;

const NavigateCrd = () => {
  const tw = useTailwind();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigateCardRouteProps>();

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={tw("bg-white flex-1")}
    >
      <Text style={tw("text-center py-5 text-xl")}>Good Morining</Text>
      <View style={tw("flex-shrink border-t border-gray-200")}>
        <View>
          <GooglePlacesAutocomplete
            styles={styles}
            placeholder="Where to?"
            fetchDetails={true}
            onPress={(data, details = null) => {
              console.log(typeof details?.geometry.location);
              console.log(details?.geometry.location, data.description);
              dispatch(
                setDestination({
                  location: details?.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
            debounce={400}
            minLength={2}
            query={{ key: API_KEY, language: "en" }}
            enablePoweredByContainer={false}
          />
        </View>
        <NewFavorites />
      </View>
      <View
        style={tw(
          "flex-row justify-evenly py-2 mt-auto border-t border-gray-100"
        )}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw(
            "rounded-full justify-between bg-black flex flex-row w-24 px-4 py-3"
          )}
        >
          <Icon name="car" type="font-awesome" color={"white"} size={16} />
          <Text style={tw("text-white text-center")}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw(
            "rounded-full flex flex-row justify-between w-24 px-4 py-3"
          )}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color={"black"}
            size={16}
          />
          <Text style={tw(" text-center")}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCrd;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDf",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
