import { Link, useTheme } from "@react-navigation/native";
import { useState, useEffect, Children } from "react";
import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {  getNearTournaments, ListAllTournaments } from "../firebase/getFunctions";
import * as Location from "expo-location";
import { Torneopalooza } from "../components/icons";

function Home({ navigation }) {
  const { dark, colors } = useTheme();

  const [partidos, setPartidos] = useState(null);
  const [cerca, setCerca] = useState(null);

  async function getTournaments() {
    const data = await ListAllTournaments();
    setPartidos(data);
  }

  async function getCurrentLocation(){
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permiso Rechazado');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    return {
      latitud: location.coords.latitude,
      longitud: location.coords.longitude
    }
  }

  async function partidosCerca(km) {

    let distance = km? km : 5

    let data = await getCurrentLocation()

    if (data) {
      let res = await getNearTournaments(data.latitud, data.longitud, distance);

      setCerca(res); 
    }
    else
    {
      setCerca(null)
    }
  }


  return (
    <ScrollView className="h-full">
      <View className="flex items-center mx-auto justify-center h-full w-full">

        <Torneopalooza width={300} height={100} color={colors.text}/>

        <Text
          onPress={() => getTournaments()}
          className="p-2 bg-indigo-600 my-4 text-white"
        >
          Ver Todos los torneos
        </Text>
        {partidos
          ? Children.toArray(
              partidos.map((partido) => (
                <>
                  <TouchableOpacity
                    className={
                      "flex p-2 px-3 my-1 rounded w-[90%] mx-auto " +
                      (dark ? "bg-slate-700/60" : "bg-black/90")
                    }
                    onPress={() =>
                      navigation.navigate({
                        name: "VerTorneo",
                        params: { 
                          id: partido.id,
                          userId: partido.userId,
                          },
                      })
                    }
                  >
                    <Text className="text-white text-xl">{partido.nombre}</Text>
                    <Text className="text-white">{partido.deporte}</Text>
                    <Text className="text-white">
                      Creado por {partido.creador}
                    </Text>
                    <Text className="text-white">{partido.direccion}</Text>
                  </TouchableOpacity>
                </>
              ))
            )
          : undefined}

        <Text
          onPress={() => partidosCerca(2000)}
          className="p-2 bg-indigo-600 my-4 text-white"
        >
          Obtener Partidos Cerca
        </Text>

        {cerca
          ? Children.toArray(
              cerca.map((partido) => (
                <>
                  <TouchableOpacity
                    className={
                      "flex p-2 px-3 my-1 rounded w-[90%] mx-auto " +
                      (dark ? "bg-slate-700/60" : "bg-black/90")
                    }
                    onPress={() =>
                      navigation.navigate({
                        name: "VerTorneo",
                        params: { id: partido.id },
                      })
                    }
                  >
                    <Text className="text-white text-xl">{partido.nombre}</Text>
                    <Text className="text-white">{partido.deporte}</Text>
                    <Text className="text-white">
                      Creado por {partido.creador}
                    </Text>
                    <Text className="text-white">{partido.direccion}</Text>
                  </TouchableOpacity>
                </>
              ))
            )
          : undefined}
      </View>
    </ScrollView>
  );
}

export default Home;
