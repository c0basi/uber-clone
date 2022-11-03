import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useTailwind } from "tailwind-rn/dist";

export const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Code Street, London, Uk",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "London Eye, London, Uk",
  },
];
const NewFavorites = () => {
  const tw = useTailwind();
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw("bg-gray-200"), { height: 0.5 }]} />
      )}
      renderItem={({ item: { icon, location, destination } }) => (
        <TouchableOpacity style={tw("flex-row items-center p-5")}>
          <Icon
            style={tw("mr-4 rounded-full bg-gray-300 p-3")}
            name={icon}
            color={"white"}
            type="ionicon"
            size={18}
          />
          <View>
            <Text style={tw("font-semibold text-lg")}>{location}</Text>
            <Text style={tw("text-gray-500")}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NewFavorites;

const styles = StyleSheet.create({});
