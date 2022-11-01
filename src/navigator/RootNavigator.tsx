import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";

export type RootStackParamList = {
  Home: undefined;
  MapScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      ></RootStack.Screen>
      <RootStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerShown: false }}
      ></RootStack.Screen>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
