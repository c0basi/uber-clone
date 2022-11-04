import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn/dist";
import { Icon } from "@rneui/themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { MapStackParamsList } from "../navigator/MapNavigator";
import {
  useNavigation,
  CompositeNavigationProp,
} from "@react-navigation/native";
import { useAppSelector } from "../redux/hooks";
import { selectTravelTimeInformation } from "../slices/navSlice";

export type Ride = {
  id: string;
  title: string;
  multiplier: number;
  image: string;
};

export const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "UberXL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-X-789",
    title: "UberLUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

export type NavigateCardRouteProps = CompositeNavigationProp<
  NativeStackNavigationProp<MapStackParamsList, "RideOptionsCard">,
  NativeStackNavigationProp<RootStackParamList>
>;
const RideOptionsCard = () => {
  const tw = useTailwind();
  const navigation = useNavigation<NavigateCardRouteProps>();
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const travelTimeInformation = useAppSelector(selectTravelTimeInformation);

  const SURCHARGE_RATE = 1.5;
  return (
    <SafeAreaView style={tw("bg-white flex-grow")}>
      <View>
        <TouchableOpacity
          style={tw("absolute top-3 z-50 left-5 p-2 rounded-full")}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw("text-center py-5 text-xl")}>
          Select a ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { image, title, multiplier, id }, item }) => (
          <TouchableOpacity
            onPress={() => setSelectedRide(item)}
            style={tw(
              `flex-row items-center justify-between px-7 ${
                id === selectedRide?.id ? "bg-gray-200" : ""
              } `
            )}
          >
            <Image
              style={{ width: 100, height: 100, resizeMode: "contain" }}
              source={{ uri: image }}
            />
            <View style={tw("-ml-5")}>
              <Text style={tw("font-semibold text-lg")}>{title}</Text>
              <Text>{travelTimeInformation?.duration.text} Travel Time</Text>
            </View>
            <Text style={tw("text-xl")}>
              {new Intl.NumberFormat("en-us", {
                style: "currency",
                currency: "CAD",
              }).format(
                (travelTimeInformation!.duration.value *
                  SURCHARGE_RATE *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          disabled={!selectedRide}
          style={tw(`bg-black py-3 m-3 ${!selectedRide && "bg-gray-300"}`)}
        >
          <Text style={tw("text-white text-center text-xl")}>
            Choose {selectedRide?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
