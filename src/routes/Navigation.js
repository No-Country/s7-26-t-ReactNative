import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import Tournament from "../screens/Tournament";
import Onboarding from "../screens/Onboarding";
import Login from "../screens/Login";
import News from "../screens/News";
import Ranking from "../screens/Ranking";
import Schedule from "../screens/Schedule";
import Favorites from "../screens/Favorites";
import Register from "../screens/Register";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function BottomNavigation({ darkMode, setDarkMode, colors }) {

  const navigation = useNavigation()

  return (
    <>
    <Tab.Navigator
      screenOptions={{
        tabBarStyle:{
          paddingTop: 10,
        },
        tabBarActiveTintColor: colors.text,
        headerLeftContainerStyle: {
          paddingLeft: 20
        },
        headerRightContainerStyle: {
          paddingRight: 20
        },
        tabBarStyle: {
          marginBottom: 2
        },
        headerLeft: () => (
          <Ionicons
            onPress={() => navigation.toggleDrawer()}
            name="menu-sharp"
            size={30}
            color={darkMode ? "#fff" : "#000"}
          />
        ),
        headerRight: () => (
          <Ionicons
            onPress={() => setDarkMode(!darkMode)}
            name={darkMode ? "sunny-outline" : "moon-outline"}
            size={30}
            color={darkMode ? "#fff" : "#000"}
          />
        )
      }}
      
    >
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarLabel:() => {return null},
          tabBarIcon: props => <FontAwesome name="trophy" size={30} color={props.color} />
        }}
      />

      <Tab.Screen
        name="Partidos"
        component={Ranking}
        options={({
          tabBarLabel:() => {return null},
          tabBarIcon: props =><FontAwesome name="user" size={30} color={props.color} />
        })}
      />

      <Tab.Screen
        name="Favoritos"
        component={Favorites}
        options={{
          tabBarLabel:() => {return null},
          tabBarIcon: props => <FontAwesome name="list" size={30} color={props.color} />
        }}
      />

      <Tab.Screen
        name="Fechas"
        component={Schedule}
        options={{
          tabBarLabel:() => {return null},
          tabBarIcon: props => <FontAwesome name="bar-chart" size={30} color={props.color} />
        }}
      />

      <Tab.Screen
        name="Noticias"
        component={News}
        options={{
          tabBarLabel:() => {return null},
          tabBarIcon: props => <FontAwesome name="newspaper-o" size={30} color={props.color} />
        }}
      />
    </Tab.Navigator>
    </>
  );
}

const lightColor = "#fff";
const darkColor = "#010101";

const CustomLight = {
  dark: false,
  colors: {
    background: lightColor,
    border: "#d8d8d8a0",
    card: lightColor,
    notification: "#ff3b30",
    primary: "#007aff",
    text: "#000",
  }
};

const CustomDark = {
  dark: true,
  colors: {
    background: darkColor,
    border: "#272729c7",
    card: darkColor,
    notification: "#ff453a",
    primary: "#0a84ff",
    text: "#fff",
  }
};

function StackNavigation({darkMode, setDarkMode}) {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" options={{ headerShown: false }}>
        {() => (
          <BottomNavigation
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            colors={darkMode ? CustomDark.colors : CustomLight.colors}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} options={{ headerTitle: "" }}/>
      <Stack.Screen name="Register" component={Register} options={{ headerTitle: "" }}/>
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
    </Stack.Navigator>
  );
}

export function DrawerNavigation(){
  const [darkMode, setDarkMode] = useState(true);

  return (
    <>
    <StatusBar style={darkMode? "light": "dark"} />
    <NavigationContainer theme={darkMode ? CustomDark : CustomLight}>
      <Drawer.Navigator>
        <Drawer.Screen name="Index" options={{ headerShown: false }}>
          {
            () => <StackNavigation darkMode={darkMode} setDarkMode={setDarkMode} />
          }
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
    </>
  );
}