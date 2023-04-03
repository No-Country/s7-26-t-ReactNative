import { useRoute, useTheme } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { UserContext } from "../context/UserContext";
import { getFixture, getTournamentTeams } from "../firebase/getFunctions";
import { ordenarPorPuntos } from "../utils";

export default function Fixture({ route }) {
  const [fixture, setFixture] = useState([]);
  const { dark, colors } = useTheme();
  const { user, tournamentId } = useContext(UserContext);
  const { id } = useRoute().params;
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    //Me lee el parametro
    console.log("Id torneo: ", `${id}`);
    console.log("Id torneo: ", tournamentId);

    //Pero la funcion no me lo toma
    /* const data = getFixture(user?.id, id); */

    //Solo cuando paso el id como string literal
    const data = getFixture(user?.id, "ceyjOmpGpcW9P6EHN6t6");
    data.then((res) => setFixture(res));

    const data1 = getTournamentTeams(user?.id, "ceyjOmpGpcW9P6EHN6t6");
    data1.then((res) => setTeams(res));
  }, [id]);
  teams.sort(ordenarPorPuntos);

  return (
    <View className="flex items-center mx-auto justify-center h-full w-full">
      {fixture.length > 0 ? (
        fixture.map((partido, index) => (
          <View
            className={
              "flex p-2 px-3 my-1 rounded w-[90%] mx-auto " +
              (dark ? "bg-slate-700/60" : "bg-black/90")
            }
            key={index}
          >
            <Text className="text-violet-500">Fecha: {partido.fecha}</Text>
            <Text className="text-white">{partido.equipoLocal}</Text>
            <Text className="text-yellow-600">vs</Text>
            <Text className="text-white">{partido.equipoVisitante}</Text>
          </View>
        ))
      ) : (
        <View className="flex justify-center items-center">
          <Text className="text-violet-600">No hay fixture aún</Text>
        </View>
      )}
      <View
        className={
          "flex p-2 px-3 my-6 rounded w-[90%] mx-auto " +
          (dark ? "bg-slate-700/60" : "bg-black/90")
        }
      >
        <Text className="text-white text-xl my-2">Posiciones: </Text>
        <View className="flex flex-row justify-between">
          <Text className="text-amber-400 font-bold">Equipo</Text>
          <Text className="text-amber-400 font-bold">Puntos</Text>
        </View>
        {teams.length > 0 ? (
          teams.map((team) => (
            <View className="flex flex-row justify-between my-1" key={team.uid}>
              <Text className="text-white">{team.nombre}</Text>
              <Text className="text-white">{team.puntos}</Text>
            </View>
          ))
        ) : (
          <Text className="text-violet-600">No hay equipos</Text>
        )}
      </View>
    </View>
  );
}
