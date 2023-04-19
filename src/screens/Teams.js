import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../context/UserContext";
import { getTournamentTeams } from "../firebase/getFunctions";
import Loader from "../components/Loader";
import { Provider } from "react-native-paper";
import TeamCard from "../components/TeamCard";

export default function Teams() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { user, tournamentId, createdBy } = useContext(UserContext);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tournamentId && createdBy) {
      const data = getTournamentTeams(createdBy, tournamentId);
      data.then((res) => {
        setTeams(res);
        setLoading(false);
      });
    }
  }, [tournamentId, createdBy, teams]);

  return (
    <Provider>
      <View className="flex items-center h-full w-full ">
        {loading ? (
          <Loader />
        ) : (
          <>
            <View className="w-full h-30 items-center py-4">
              <Text style={{ color: colors.primaryText }} className="text-xl py-4">
                {teams.length > 0 ? "Equipos competidores:" : "No hay equipos"}
              </Text>
            </View>
            <ScrollView className="w-full">
              <View className="flex flex-row flex-wrap items-center justify-center w-full h-auto ">
                {teams?.map((team) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                    tournamentId={tournamentId}
                    createdBy={createdBy}
                  />
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
    </Provider>
  );
}
