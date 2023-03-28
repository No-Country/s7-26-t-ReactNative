import { createStackNavigator } from "@react-navigation/stack";

import Home from "../views/Home";
import Tournament from "../views/Tournament";
import Onboarding from "../views/Onboarding";
import Fixture from "../views/Fixture";

const Stack = createStackNavigator();

export function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />

      <Stack.Screen
        name="Tournament"
        options={{ headerShown: false }}
        component={Tournament}
      />
      
      <Stack.Screen
        name="Onboarding"
        options={{ headerShown: false }}
        component={Onboarding}
      />
      <Stack.Screen
        name="Fixture"
        options={{ headerShown: false }}
        component={Fixture}
      />
    </Stack.Navigator>
  );
}
