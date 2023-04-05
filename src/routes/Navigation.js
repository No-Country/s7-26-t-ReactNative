import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Home from "../screens/Home";
import Tournament from "../screens/Tournament";
import Onboarding from "../screens/Onboarding";
import Login from "../screens/Login";
import News from "../screens/News";
import Ranking from "../screens/Ranking";
import Stats from "../screens/Stats";
import Fixture from "../screens/Fixture";
import Register from "../screens/Register";
import { Button, Image, Text, View, TouchableOpacity } from "react-native";
import { logOut } from "../firebase/auth";
import CreateTournament from "../screens/CreateTournament";
import ViewTournament from "../screens/ViewTournament";
import { UserContext } from "../context/UserContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function BottomNavigation({}) {
  const navigation = useNavigation();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            paddingTop: 10,
          },
          headerTintColor: "#fff",
          tabBarActiveTintColor: "#F6BF47",
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
          headerRightContainerStyle: {
            paddingRight: 20,
          },
          tabBarStyle: {
            marginBottom: 2,
            shadowColor: "transparent",
            borderTopWidth: 0
          },
          headerStyle:{
            shadowColor: "transparent",
            borderBottomWidth: 0
          },
          headerLeft: () => (
            <Ionicons
              onPress={() => navigation.toggleDrawer()}
              name="menu-sharp"
              size={30}
              color={"#fff"}
            />
          ),
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={Home}
          options={{
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: (props) => (
              <FontAwesome name="trophy" size={30} color={props.color} />
            ),
          }}
        />

        <Tab.Screen
          name="Competidores"
          component={Ranking}
          options={{
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: (props) => (
              <FontAwesome name="user" size={30} color={props.color} />
            ),
          }}
        />

        <Tab.Screen
          name="Fixture"
          component={Fixture}
          options={{
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: (props) => (
              <FontAwesome name="list" size={30} color={props.color} />
            ),
          }}
        />

        <Tab.Screen
          name="Estadisticas"
          component={Stats}
          options={{
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: (props) => (
              <FontAwesome name="bar-chart" size={30} color={props.color} />
            ),
          }}
        />

        <Tab.Screen
          name="Noticias"
          component={News}
          options={{
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: (props) => (
              <FontAwesome name="newspaper-o" size={30} color={props.color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

function StackNavigation({}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" options={{ headerShown: false }}>
        {() => (
          <BottomNavigation
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="CrearTorneo"
        component={CreateTournament}
        username={(params) => params.username}
      />
      <Stack.Screen
        name="VerTorneo"
        component={ViewTournament}
        username={(params) => params.tournament}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerTitle: "" }}
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
    </Stack.Navigator>
  );
}

function CustomDrawerContent({ props, navigation }) {
  const { user } = useContext(UserContext);


  return (
    <DrawerContentScrollView {...props}>
      <View className="flex-1 justify-between h-full items-center">
        {user ? (
          <View className="flex gap-y-2 w-full items-center">
            <View className="mx-auto p-4 flex items-center gap-y-4 bg-indigo-900 w-full">
              <FontAwesome name="user-circle" size={60} color="#fff" />
              <Text className="font-bold text-lg text-white">
                Hola {user.username}
              </Text>
            </View>

            <TouchableOpacity
              className="bg-indigo-500 p-2 w-full"
              onPress={() =>
                navigation.navigate("CrearTorneo", {
                  username: user.username,
                })
              }
            >
              <Text className="text-white font-bold text-center text-base">
                Crear Torneo
              </Text>
            </TouchableOpacity>
          </View>
        ) : undefined}
        <View className="flex flex-col gap-y-4 items-center my-2">
          {!user?.email ? (
            <>
              <TouchableOpacity
                className="bg-indigo-600 p-3 rounded-md"
                onPress={() => navigation.navigate("Login")}
              >
                <Text className="text-white font-bold text-center text-base">
                  Iniciar Sesion
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-indigo-600 p-3 rounded-md"
                onPress={() => navigation.navigate("Register")}
              >
                <Text className="text-white font-bold text-center text-base">
                  Registro
                </Text>
              </TouchableOpacity>
            </>
          ) : undefined}
        </View>

        {user ? (
          <TouchableOpacity
            className="bg-indigo-600 p-3 rounded-md"
            onPress={() => logOut()}
          >
            <Text className="text-white font-bold text-center text-base">
              Cerrar Sesion
            </Text>
          </TouchableOpacity>
        ) : undefined}
      </View>
    </DrawerContentScrollView>
  );
}

//card es el header y bottombar por defecto

const RootColors = {
  dark: false,
  colors: {
    background: "#52408e",
    border: "#d8d8d8a0",
    card: "#52408e",
    notification: "#ff3b30",
    primary: "#007aff",
    text: "#000",
    grey: "#bdbdbd",
    purple: "#52408e",
    yellow: "#F0C05A"
  },
};

export function DrawerNavigation() {

  return (
    <>
      <StatusBar style={"light"} />
      <NavigationContainer theme={RootColors}>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Index" options={{ headerShown: false }}>
            {() => (
              <StackNavigation />
            )}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}
