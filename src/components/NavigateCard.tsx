import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
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
