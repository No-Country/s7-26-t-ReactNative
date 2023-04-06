import { useTheme } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getNearTournaments, ListAllTournaments, searchTournaments } from "../firebase/getFunctions";
import * as Location from "expo-location";
import { Torneopalooza } from "../components/icons";

import { Sports } from '../components/SelectSports'
import Tournaments from "../components/Tournaments";
import { SearchBar } from "../components/SearchBar";

function Home({ navigation }) {
  const { colors } = useTheme();

  const [partidos, setPartidos] = useState(null);
  const [cerca, setCerca] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [sport, setSport] = useState(false);
  const [filtrados, setPartidosFiltrados] = useState(false);
  const [tournaments, setTournaments] = useState(false);
  const searchTerm = searchText.toLowerCase();


  useEffect(() => {
    getTournaments()

  }, [])


  async function getTournaments() {
    const data = await ListAllTournaments();
    setPartidos(data);
    setPartidosFiltrados(null)

  }

  async function getCurrentLocation() {
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

  const tournamentHalder = () => {
    setTournaments(true)
    getTournaments()
    setPartidosFiltrados(null)
  }

  const sportsHandler = () => {
    setTournaments(false)
    setSport(false)
    setPartidosFiltrados(null)
  }

  const handleSearch = async (text) => {
    setSearchText(text);
    let data = await searchTournaments(searchTerm)

    if (partidos && tournaments) {
      setPartidos(data)
    }
    if (filtrados) {
      setPartidosFiltrados(data)
    }
  };

  async function partidosCerca(km) {

    let distance = km ? km : 5

    let data = await getCurrentLocation()

    if (data) {
      let res = await getNearTournaments(data.latitud, data.longitud, distance);

      setCerca(res);
    }
    else {
      setCerca(null)
    }
  }

  return (

    <ScrollView className="h-full">
      <View className="flex items-center mx-auto justify-center h-full w-full">

        <Torneopalooza width={300} height={100} color={colors.text} />

        {(partidos && tournaments) || filtrados ?
          (<SearchBar handleSearch={handleSearch} searchText={searchText} />) : null
        }

        <View className={"flex-row w-full justify-around mt-5 mb-5"}>

          <TouchableOpacity
            onPress={() => tournamentHalder()}
          >
            <Text
              style={{ color: "white", fontWeight: "bold", fontSize: 18, backgroundColor: "#6c5d9e", padding: 4, borderRadius: 4 }}
            >TORNEOS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => sportsHandler()}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, backgroundColor: "#6c5d9e", padding: 4, borderRadius: 4 }}> DEPORTES</Text>
          </TouchableOpacity>
        </View>

        {!tournaments && !sport ?
          (<Sports sport={sport} setSport={setSport} setPartidosFiltrados={setPartidosFiltrados} />) : null
        }
        {partidos && tournaments
          ? (<Tournaments data={partidos} />) : null}

        {/* <Text
          onPress={() => partidosCerca(2000)}
          className="p-2 bg-indigo-600 my-4 text-white"
        >
          Obtener Partidos Cerca
        </Text> */}

        {filtrados ?
          (<Tournaments data={filtrados} />) : null
        }
        {/* {cerca
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
                      params: { id: partido.id, userId: partido.userId}
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
          : undefined} */}
      </View>
    </ScrollView>
  );
}



export default Home;
