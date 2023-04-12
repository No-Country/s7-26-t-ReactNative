import { useTheme } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getNearTournaments, ListAllTournaments, searchTournaments } from "../firebase/getFunctions";
import * as Location from "expo-location";
import { Torneopalooza } from "../components/icons";
import { Sports } from '../components/SelectSports'
import Tournaments from "../components/Tournaments";
import { SearchBar } from "../components/SearchBar";
import { FilteredSports } from "../components/FilteredSports";

function Home({ navigation }) {
  const { colors } = useTheme();

  const [partidos, setPartidos] = useState(null);
  const [cerca, setCerca] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [sport, setSport] = useState(false);
  const [filtrados, setPartidosFiltrados] = useState(false);
  const [tournaments, setTournaments] = useState(false);
  const searchTerm = searchText.toLowerCase();
  const [selected, setSelected] = useState([]);
  const [accepted, setAccepted] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getTournaments()
  }, [])


  async function getTournaments() {
    // const data = await ListAllTournaments();
    // setPartidos(data);
    setPartidos([]);
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
          (<SearchBar modalVisible={modalVisible} setModalVisible={setModalVisible} setAccepted={setAccepted} selected={selected} setSelected={setSelected} handleSearch={handleSearch} searchText={searchText} />) : null
        }

        <View className={"flex-row w-full justify-around mt-5 mb-5"}>

          <TouchableOpacity
            onPress={() => tournamentHalder()}
          >
            <View className={"bg-purple-700 text-xl p-2 rounded-lg "  + (tournaments? "text-yellow-300" : "text-white")}>

            <Text
            className={"text-lg font-bold " + (tournaments? "text-white" : "text-slate-300")}
             
            >TORNEOS</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => sportsHandler()}
          >
            <View className={"bg-purple-700 text-xl p-2 rounded-lg "  + (!tournaments? "text-yellow-300" : "text-white")}>
            <Text className={"text-lg font-bold " + (!tournaments? "text-white" : "text-slate-300")}> DEPORTES</Text>

            </View>
          </TouchableOpacity>
        </View>

        

        {!tournaments && !sport ?
          (<Sports sport={sport} setSport={setSport} setPartidosFiltrados={setPartidosFiltrados} />) : null
        }
        {partidos && tournaments
          ? (<Tournaments data={partidos} />) : null}


          {tournaments && accepted && modalVisible==false ?
            (<FilteredSports   selected={selected} setSelected={setSelected}/>):null
        }
        {/* <Text
          onPress={() => partidosCerca(2000)}
          className="p-2 bg-indigo-600 my-4 text-white"
        >
          Obtener Partidos Cerca
        </Text> */}

        {filtrados ?
          (<Tournaments fromHome={true} data={filtrados} />) : null
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
         */}


        
      </View>
    </ScrollView>
  );
}



export default Home;
