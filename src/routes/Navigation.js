import {
  NavigationContainer,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
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
import Onboarding from "../screens/Onboarding";
import Login from "../screens/Login";
import News from "../screens/News";
import Teams from "../screens/Teams";
import Stats from "../screens/Stats";
import Fixture from "../screens/Fixture";
import Register from "../screens/Register";
import { ScrollView, Image, Text, View, TouchableOpacity } from "react-native";
import { logOut } from "../firebase/auth";
import CreateTournament from "../screens/CreateTournament";
import ViewTournament from "../screens/ViewTournament";
import { UserContext } from "../context/UserContext";
import AddTeam from "../screens/AddTeam";
import EditTeam from "../screens/EditTeam";
import { RootColors } from "../theme.js";
import Profile from "../screens/Profile";
import { Torneopalooza } from "../components/icons";
import MyTournaments from "../screens/MyTournaments";
import TournamentDetails from "../components/TournamentDetails";
import AboutUs from "../screens/AboutUs";
import Privacy from "../screens/Privacy";
import Terms from "../screens/Terms";
import QA from "../screens/QA";
import MyFollows from "../screens/MyFollows";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function BottomNavigation({}) {
  const navigation = useNavigation();
  const { colors } = useTheme();

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
          headerTitleAlign: "center",
          headerRightContainerStyle: {
            paddingRight: 20,
          },
          tabBarStyle: {
            shadowColor: "transparent",
            borderTopWidth: 0,
          },
          headerStyle: {
            shadowColor: "transparent",
            backgroundColor: colors.primaryColor,
            borderBottomWidth: 0,
          },
          headerTitle: "",
          headerLeft: () => (
            <Ionicons
              onPress={() => navigation.toggleDrawer()}
              name="menu-sharp"
              size={30}
              color={colors.accentColor}
            />
          ),
          headerTitle: () => (
            <Torneopalooza width={100} height={30} color={colors.accentColor} />
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
          component={Teams}
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

        <Tab.Screen
          name="VerTorneo"
          component={ViewTournament}
          username={(params) => params.tournament}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
          }}
        />
      </Tab.Navigator>
    </>
  );
}

function StackNavigation() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity
            className="w-10 py-2"
            onPress={() => navigation.goBack()}
          >
            <FontAwesome
              name="chevron-left"
              size={20}
              color={colors.accentColor}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <Torneopalooza width={75} height={45} color={colors.accentColor} />
        ),
        headerTitle: "",
        headerStyle: {
          backgroundColor: colors.primaryColor,
          borderBottomWidth: 0,
          shadowColor: "transparent",
        },
      }}
    >
      <Stack.Screen
        name="Root"
        options={{
          headerShown: false,
        }}
      >
        {() => <BottomNavigation />}
      </Stack.Screen>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="CrearTorneo"
        component={CreateTournament}
        username={(params) => params.username}
      />
      <Stack.Screen
        name="MisTorneos"
        component={MyTournaments}
        id={(params) => params.id}
      />

      <Stack.Screen name="MisSeguidos" component={MyFollows} />

      <Stack.Screen name="AddTeam" component={AddTeam} />
      <Stack.Screen name="EditTeam" component={EditTeam} />
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
        name="Onboarding"
        options={{ headerShown: false }}
        component={Onboarding}
      />
      <Stack.Screen name="MiPerfil" component={Profile} />

      <Stack.Screen name="Nosotros" component={AboutUs} />

      <Stack.Screen name="Privacidad" component={Privacy} />

      <Stack.Screen name="Terminos" component={Terms} />

      <Stack.Screen name="Preguntas" component={QA} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent({ props }) {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  return (
    <DrawerContentScrollView {...props}>
      <ScrollView>
        <View className="flex h-full justify-between pb-4">
          <View className="flex justify-between items-center">
            {user ? (
              <View className="flex w-full items-center mb-[3vh]">
                <View className="mx-auto p-4 flex items-center gap-y-4 w-full">
                  {user?.photo ? (
                    <Image
                      resizeMode="contain"
                      style={{
                        height: 80,
                        width: 80,
                        borderRadius: 100,
                        marginBottom: -10,
                      }}
                      source={{
                        uri: user?.photo,
                      }}
                    />
                  ) : (
                    <FontAwesome name="user-circle" size={60} color="#fff" />
                  )}

                  <Text className="font-bold text-lg text-white text-center">
                    {user.username}
                  </Text>
                </View>

                <TouchableOpacity
                  className="py-2.5 pl-6 w-full bg-white/5 flex gap-x-2 flex-row items-center"
                  onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "Index" }],
                    });
                  }}
                >
                  <View className="flex items-center justify-center w-5">
                    <FontAwesome name="home" size={20} color="#fff" />
                  </View>
                  <Text className="text-white font-bold text-base">Inicio</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="py-2.5 pl-6 w-full bg-white/5 flex gap-x-2 flex-row items-center"
                  onPress={() =>
                    navigation.navigate("MiPerfil", {
                      username: user.username,
                    })
                  }
                >
                  <View className="flex items-center justify-center w-5">
                    <FontAwesome name="user" size={20} color="#fff" />
                  </View>
                  <Text className="text-white font-bold text-base">
                    Mi Perfil
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="py-2.5 pl-6 w-full bg-white/5 flex gap-x-2 flex-row items-center"
                  onPress={() =>
                    navigation.navigate("MisTorneos", {
                      id: user.id,
                      username: user.username,
                    })
                  }
                >
                  <View className="flex items-center justify-center w-5">
                    <MaterialCommunityIcons
                      name="tournament"
                      size={20}
                      color="#fff"
                    />
                  </View>
                  <Text className="text-white font-bold text-base">
                    Mis Torneos
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="py-2.5 pl-6 w-full bg-white/5 flex gap-x-2 flex-row items-center"
                  onPress={() => navigation.navigate("MisSeguidos")}
                >
                  <View className="flex items-center justify-center w-5">
                    <FontAwesome name="star" size={20} color="#fff" />
                  </View>
                  <Text className="text-white font-bold text-base">
                    Torneos Seguidos
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="py-2.5 pl-6 w-full bg-white/5 flex gap-x-2 flex-row items-center"
                  onPress={() =>
                    navigation.navigate("CrearTorneo", {
                      username: user.username,
                    })
                  }
                >
                  <View className="flex items-center justify-center w-5">
                    <FontAwesome name="trophy" size={20} color="#fff" />
                  </View>
                  <Text className="text-white font-bold text-base">
                    Crear Torneo
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Preguntas")}
                  className="py-2.5 pl-6 w-full bg-white/5 mt-4 border-t border-t-slate-700/25 flex flex-row items-center gap-x-2"
                >
                  <View className="flex items-center justify-center w-5">
                    <FontAwesome name="question" size={20} color="#fff" />
                  </View>
                  <Text className="text-white font-bold text-base">
                    Preguntas Frecuentes
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Privacidad")}
                  className="py-2.5 pl-6 w-full bg-white/5 flex gap-x-2 flex-row items-center"
                >
                  <View className="flex items-center justify-center w-5">
                    <FontAwesome name="book" size={20} color="#fff" />
                  </View>
                  <Text className="text-white font-bold text-base">
                    Politicas de Privacidad
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Terminos")}
                  className="py-2.5 pl-6 w-full bg-white/5 flex gap-x-2 flex-row items-center"
                >
                  <View className="flex items-center justify-center w-5">
                    <FontAwesome name="list-alt" size={20} color="#fff" />
                  </View>
                  <Text className="text-white font-bold text-base">
                    Terminos y Condiciones
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Nosotros")}
                  className="py-2.5 pl-6 w-full bg-white/5 flex gap-x-2 flex-row items-center"
                >
                  <View className="flex items-center justify-center w-5">
                    <FontAwesome name="group" size={20} color="#fff" />
                  </View>
                  <Text className="text-white font-bold text-base">
                    Sobre Nosotros
                  </Text>
                </TouchableOpacity>
              </View>
            ) : undefined}

            <View className="flex flex-col gap-y-4 items-center my-2">
              {!user?.email ? (
                <>
                  <TouchableOpacity
                    className="p-3 rounded-md bg-white/5 border-b border-b-slate-700/25 flex items-center flex-row gap-x-0.5 w-40 justify-center"
                    onPress={() => navigation.navigate("Login")}
                  >
                    <View className="flex items-center justify-center w-5">
                      <FontAwesome name="sign-in" size={20} color="#fff" />
                    </View>
                    <Text className="text-white font-bold text-center text-base">
                      Iniciar Sesion
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="p-3 rounded-md bg-white/5 border-b border-b-slate-700/25 flex items-center flex-row gap-x-0.5 w-40 justify-center"
                    onPress={() => navigation.navigate("Register")}
                  >
                    <View className="flex items-center justify-center w-5">
                      <AntDesign name="addusergroup" size={20} color="#fff" />
                    </View>
                    <Text className="text-white font-bold text-center text-base">
                      Registrate
                    </Text>
                  </TouchableOpacity>
                </>
              ) : undefined}
            </View>
          </View>

          <View>
            {user ? (
              <TouchableOpacity
                className="p-3 rounded-md flex items-center flex-row self-center gap-x-2"
                onPress={() => logOut()}
              >
                <Text className="text-[#FFC107] font-bold text-center text-base border-b border-b-[#FFC107] ">
                  Cerrar Sesion
                </Text>
                <View className="flex items-center justify-center">
                  <FontAwesome name="sign-out" size={24} color="#FFC107" />
                </View>
              </TouchableOpacity>
            ) : undefined}
          </View>
        </View>
      </ScrollView>
    </DrawerContentScrollView>
  );
}

export function DrawerNavigation() {
  return (
    <>
      <StatusBar style={"light"} />
      <NavigationContainer theme={RootColors}>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="Index"
            options={{
              headerShown: false,
              headerTitle: "",
              headerStyle: {
                backgroundColor: "transparent",
              },
            }}
          >
            {() => <StackNavigation />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}
