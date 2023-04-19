import { useRoute, useTheme } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";
import { getFixture, getTournamentTeams } from "../firebase/getFunctions";
import { RoundRobin } from "tournament-pairings";
import { ordenarFechas, ordenarPorPuntos } from "../utils";
import { ScrollView } from "react-native";
import { setFixtureDB } from "../firebase/setFunctions";
import MatchCard from "../components/MatchCard";
import Toast from "react-native-toast-message";
import { toastConfig } from "../components/Toast";

export default function Fixture({ route }) {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [fixture, setFixture] = useState([]);
  const { colors } = useTheme();
  const { user, tournamentId, createdBy } = useContext(UserContext);
  const [confirm, setConfirm] = useState(false);

  const createFixture = () => {
    try {
      const data = getTournamentTeams(createdBy, tournamentId);
      data.then((res) => setTeams(res.map((team) => team.nombre)));

      if (teams.length !== 0 && teams.length % 2 === 0) {
        let test = RoundRobin(teams);
        /* console.log("Fixture: ", test); */
        setFixture(test);
      } else {
        Toast.show({
          type: "error",
          text1: "❌ Debes tener un número par de equipos!",
          text2: "⚠️ Agrega un equipo",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = () => {
    fixture.forEach((doc) => setFixtureDB(createdBy, tournamentId, doc));
    setConfirm(true);
  };

  useEffect(() => {
    const data1 = getFixture(createdBy, tournamentId);
    data1.then((res) => {
      if (res.length > 0) {
        setFixture(res);
        setConfirm(false);
        setLoading(false);
      } else {
        setFixture([]);
        setConfirm(true);
        setLoading(false);
      }
    });
  }, [tournamentId, createdBy]);
  fixture.sort(ordenarFechas);

  return (
    <View className="flex items-center justify-center h-full w-full">
      <View className="z-10">
        <Toast config={toastConfig} />
      </View>
      {loading ? (
        <Loader />
      ) : (
        <>
          {fixture.length > 0 ? (
            <>
              <ScrollView className="w-full py-2">
                {fixture.map((partido, index) => (
                  <MatchCard partido={partido} key={partido.id} />
                ))}
              </ScrollView>
              {confirm === true ? (
                <View className="flex flex-row justify-center my-2 gap-x-4 w-full ">
                  <TouchableOpacity
                    style={{ backgroundColor: colors.accentColor }}
                    className="p-3 rounded-md mb-3 "
                    onPress={() => handleConfirm()}
                  >
                    <Text
                      className="font-bold text-center text-base"
                      style={{ color: colors.primaryText }}
                    >
                      Confirmar Fixture
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ borderColor: colors.accentColor, borderWidth: 1 }}
                    className="p-3 rounded-md mb-3 "
                    onPress={() => createFixture()}
                  >
                    <Text className="font-bold text-center text-base text-white">
                      Volver a generar Fixture
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </>
          ) : (
            <View className="flex justify-center items-center ">
              <Text style={{ color: colors.primaryText }} className="text-xl">
                No hay fixture creado aún
              </Text>
              <Text> </Text>
              {user && user.id === createdBy ? (
                <TouchableOpacity
                  style={{ backgroundColor: colors.accentColor }}
                  className="p-3 rounded-md mb-3 "
                  onPress={() => createFixture()}
                >
                  <Text
                    className="font-bold text-center text-base"
                    style={{ color: colors.primaryText }}
                  >
                    Crear Fixture
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          )}
        </>
      )}
    </View>
  );
}
