import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Icon } from "@rneui/themed";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";

type Data = {
  id: string;
  title: string;
  image: string;
  screen: "Home" | "MapScreen";
};

const data: Data[] = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "MapScreen",
  },
];
// might need to change this
export type NavOptionsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const NavOptions = () => {
  const navigation = useNavigation<NavOptionsNavigationProp>();
  const tw = useTailwind();
  return (
    <View>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screen)}
            style={tw("bg-gray-200 p-2 pl-6 pb-8 pt-4 m-2 w-40")}
          >
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <Text style={tw("mt-2 text-lg font-semibold")}>{item.title}</Text>
            <Icon
              style={tw("bg-black rounded-full p-1 w-9 mt-4")}
              name="arrowright"
              color={"white"}
              type="antdesign"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavOptions;
