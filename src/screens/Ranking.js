import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../context/UserContext";
import {
  getTournamentTeams,
  getUserTournaments,
} from "../firebase/getFunctions";

export default function Ranking() {
  const navigation = useNavigation();
  const { dark, colors } = useTheme();
  const { user, tournamentId, createdBy } = useContext(UserContext);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    //Necesito parametros userId, tournamentId para hacer la solicitud, segun el torneo que se solicite
    if (tournamentId && createdBy ){

      const data = getTournamentTeams(
        createdBy,
        tournamentId
      );
      data.then((res) => setTeams(res));
    }
  }, [tournamentId, createdBy]);

  return (
    <View className="flex items-center h-full w-full ">
      <View className="w-full h-36 items-center py-4">
        <Text className="text-white text-base ">
          Equipos participantes del torneo:{" "}
        </Text>
      </View>
      <ScrollView className="w-full">
        <View className="flex flex-row flex-wrap gap-2 items-center justify-center w-full h-auto ">
          {teams?.map((team) => (
            <TouchableOpacity
              key={team.nombre}
              className={"flex p-2 px-3 my-1 rounded-lg w-32 "}
              style={{ backgroundColor: colors.lightPrimary }}
            >
              <View className="flex felx-col items-center">
                <Image
                  source={{ uri: team.imagen }}
                  className="h-16 w-16 rounded-full "
                />
                <Text
                  className=" text-md my-1"
                  style={{ color: colors.primaryText }}
                >
                  {team.nombre}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {user ? (
        <View className="my-4">
          <TouchableOpacity
            style={{ backgroundColor: colors.accentColor }}
            className="p-4 rounded-lg"
            onPress={()=> navigation.navigate("AddTeam")}
          >
            <Text>Agregar Equipo</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
