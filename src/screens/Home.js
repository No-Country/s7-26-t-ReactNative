import { useTheme } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  ListAllTournaments,
  searchTournaments,
} from "../firebase/getFunctions";
import { Sports } from "../components/SelectSports";
import Tournaments from "../components/Tournaments";
import { SearchBar } from "../components/SearchBar";
import { RootColors } from "../theme.js";

function Home() {
  /*   const { colors } = useTheme(); */
  const { colors } = RootColors;

  const [partidos, setPartidos] = useState(false);
  const [sport, setSport] = useState(false);

  // setea la vista de home si esta en true muestra los torneos, sino muestra los iconos de deportes
  const [sportsScreen, setSportsScreen] = useState(false);

  async function getTournaments() {
    const data = await ListAllTournaments();
    setPartidos(data);
  }

  useEffect(() => {
    getTournaments();
  }, []);

  const sportScreenHandler = () => {
    setSportsScreen(true);
    getTournaments();
  };

  return (
    <ScrollView
      className="h-full p-4"
      style={{
        backgroundColor: sportsScreen ? colors.background : colors.primaryColor,
      }}
    >
      <View className="flex items-center mx-auto justify-center h-full w-full pb-4">
        {sportsScreen ? <SearchBar setPartidos={setPartidos} /> : null}
        <View
          style={
            sportsScreen
              ? {
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.3,
                  shadowRadius: 2,
                  elevation: 3,
                }
              : null
          }
          className={
            "rounded-xl flex w-full p-2 my-5 " +
            (sportsScreen ? "bg-white" : null)
          }
        >
          <View className={"flex-row w-full justify-around my-5"}>
            <TouchableOpacity onPress={() => sportScreenHandler()}>
              <View className=" text-xl py-2 px-3 rounded-lg">
                <Text
                  className={
                    "text-lg font-bold border-b-2 " +
                    (sportsScreen
                      ? "text-black  border-indigo-600"
                      : "text-white/50 border-transparent")
                  }
                >
                  Torneos
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSportsScreen(false)}>
              <View className=" text-xl py-2 px-3 rounded-lg">
                <Text
                  className={
                    "text-lg font-bold border-b-2 " +
                    (!sportsScreen
                      ? `text-gray-100 border-b-[#FFC107] `
                      : "text-slate-500 border-transparent")
                  }
                >
                  Deportes
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
      </View>
    </ScrollView>
  );
}

export default Home;
