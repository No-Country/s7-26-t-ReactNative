import { useTheme } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ListAllTournaments, searchTournaments } from "../firebase/getFunctions";
import { Torneopalooza } from "../components/icons";
import { Sports } from '../components/SelectSports'
import Tournaments from "../components/Tournaments";
import { SearchBar } from "../components/SearchBar";

function Home() {
  const { colors } = useTheme();

  const [partidos, setPartidos] = useState(false);
  const [sport, setSport] = useState(false);

  // setea la vista de home si esta en true muestra los torneos, sino muestra los iconos de deportes
  const [sportsScreen, setSportsScreen] = useState(false);

  async function getTournaments() {
    const data = await ListAllTournaments();
    setPartidos(data);
  }

  useEffect(() => {
    getTournaments()
  }, [])

  const sportScreenHandler = () =>{
    setSportsScreen(true)
    getTournaments()
  }


  return (
    <ScrollView className="h-full">
      <View className="flex items-center mx-auto justify-center h-full w-full">
        <Torneopalooza width={300} height={100} color={colors.yellow} />

        {sportsScreen ? (
          <SearchBar
            setPartidos={setPartidos}
          />
        ) : null}

        <View className={"flex-row w-full justify-around my-5"}>
          <TouchableOpacity onPress={() => sportScreenHandler()}>
            <View className="bg-purple-700 text-xl py-2 px-3 rounded-lg" >
              <Text
                className={
                  "text-lg font-bold " +
                  (sportsScreen ? "text-white" : "text-slate-300")
                }
              >
                TORNEOS
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSportsScreen(false)}>
            <View className="bg-purple-700 text-xl py-2 px-3 rounded-lg" >
              <Text
                className={
                  "text-lg font-bold " +
                  (!sportsScreen ? "text-white" : "text-slate-300")
                }
              >
                DEPORTES
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {sportsScreen ? (
          <Tournaments data={partidos} />
        ) : (
          <Sports
            setSport={setSport}
            setPartidos={setPartidos}
            setSportsScreen={setSportsScreen}
          />
        )}

      </View>
    </ScrollView>
  );
}



export default Home;
