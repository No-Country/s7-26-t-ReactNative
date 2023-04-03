import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../context/UserContext";
import { getUserTournaments } from "../firebase/getFunctions";

export default function Ranking() {
  const navigation = useNavigation();
  const { dark, colors } = useTheme();
  const { user, setTournamentId } = useContext(UserContext);
  const [tournaments, setTournaments] = useState([]);
  useEffect(() => {
    const data = getUserTournaments(user?.id);
    data.then((res) => setTournaments(res));
    console.log(tournaments);
  }, [user.id]);
  return (
    <View className="flex items-center mx-auto justify-center h-full w-full">
      {tournaments?.map((tournament) => (
        <TouchableOpacity
          key={tournament.id}
          className={
            "flex p-2 px-3 my-1 rounded w-[90%] mx-auto " +
            (dark ? "bg-slate-700/60" : "bg-black/90")
          }
          onPress={() => {
            navigation.navigate({
              name: "Fixture",
              params: { id: tournament.id },
            });
            setTournamentId(tournament.id);
          }}
        >
          <View>
            <Text className="text-white text-xl">
              Torneo: {tournament.nombre}
            </Text>
            <Text className="text-white">
              Lugar: {tournament.direccion}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
