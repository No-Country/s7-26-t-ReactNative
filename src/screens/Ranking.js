import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Necesito parametros userId, tournamentId para hacer la solicitud, segun el torneo que se solicite
    if (tournamentId && createdBy) {
      const data = getTournamentTeams(createdBy, tournamentId);
      data.then((res) => {
        setTeams(res);
        setLoading(false);
      });
    }
    /* if(teams.length > 0) setLoading(false) */
  }, [tournamentId, createdBy]);

  return (
    <View className="flex items-center h-full w-full ">
      {loading ? (
        <ActivityIndicator size={50} color={colors.accentColor} />
      ) : (
        <>
          <View className="w-full h-30 items-center py-4">
            <Text style={{ color: colors.textIcons }} className="text-base ">
              {teams.length > 0 ? "Equipos competidores:" : "No hay equipos"}
            </Text>
          </View>
          <ScrollView className="w-full">
            <View className="flex flex-row flex-wrap gap-2 items-center justify-center w-full h-auto ">
              {teams?.map((team) => (
                <TouchableOpacity
                  key={team.nombre}
                  className={"flex p-2 px-3 my-1 rounded-lg w-36 h-30 "}
                  style={{ backgroundColor: colors.lightPrimary }}
                >
                  <View className="flex felx-col items-center space-y-4">
                    {team.imagen ? (
                      <Image
                        source={{ uri: team.imagen }}
                        className="h-16 w-16 rounded-full "
                      />
                    ) : (
                      <Image
                        source={require("../../assets/defaultGroup.png")}
                        className="h-16 w-16 rounded-full "
                      />
                    )}
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
          {user && user.id === createdBy ? (
            <View className="my-4">
              <TouchableOpacity
                style={{ backgroundColor: colors.accentColor }}
                className="p-4 rounded-lg"
                onPress={() => navigation.navigate("AddTeam")}
              >
                <Text>Agregar Equipo</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </>
      )}
    </View>
  );
}
