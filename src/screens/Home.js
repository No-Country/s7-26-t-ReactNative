import { Link, useTheme } from "@react-navigation/native";
import { useState, useEffect, Children } from "react";
import { Button, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { getNearTournaments, ListAllTournaments } from "../firebase/getFunctions";
import * as Location from "expo-location";
import { Torneopalooza } from "../components/icons";
import { Searchbar } from 'react-native-paper';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Sports } from '../components/SelectSports'
import Tournaments from "../components/Tournaments";

function Home({ navigation }) {
  const { dark, colors } = useTheme();

  const [partidos, setPartidos] = useState(null);
  const [cerca, setCerca] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [tournaments, setTournaments] = useState(false);
  const searchTerm = searchText.toLowerCase();


  useEffect(() => {
    getTournaments()
   
  }, [])
  

  async function getTournaments() {
    const data = await ListAllTournaments();
    setPartidos(data);
   
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

  const tournamentHalder = () =>{
    setTournaments(true)
    getTournaments()
  
}

const sportsHandler = () =>{
  setTournaments(false)


}


  const handleSearch = (text) => {
    setSearchText(text);
    console.log(searchTerm)
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




        <View className="flex flex-row justify-around content-center items-center">
          <Searchbar
            
            onChangeText={handleSearch}
            value={searchText}
            inputStyle={styles.input}
            style={styles.search}
            icon={() => <FontAwesome name="search" size={24} color={'black'} />}
          />

          <Text className="p-2 bg-indigo-600 my-4 text-white"> FILTROS </Text>
        </View>



        <View className={"flex-row w-full justify-around mt-5"}>

          <TouchableOpacity
            onPress={() => tournamentHalder()}
          >
            <Text
              className={

                (dark ? "text-white" : "text-black")
              }
            >TORNEOS</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => sportsHandler()}
          >
            <Text className={(dark ? "text-white" : "text-black")}> DEPORTES</Text>
          </TouchableOpacity>

        </View>

        {!tournaments ?
          (<Sports tournaments={tournaments} setTournaments={setTournaments} getTournaments={getTournaments} />) : null
        }



        {partidos && tournaments
          ? (<Tournaments data={partidos} />) : null}

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

const styles = StyleSheet.create({
  search: {
    width: '70%',
    border: 'none',
    height: 40,
    elevation: 0,
    borderRadius: 2,
    borderTopWidth: 0, //works
    borderBottomWidth: 0, //works
  },
  input: {
    marginTop: -6
  }

})

export default Home;