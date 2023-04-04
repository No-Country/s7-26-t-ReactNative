import { View, Text } from "react-native";
import React from "react";

export default function TournamenTable({teams}) {

  return (
    <View className="w-full h-full bg-purple-400 my-4">
      <View className={"flex p-2 my-6 w-[90%] mx-auto "}>
        <Text className="text-white text-xl my-2">Posiciones: </Text>
        <View className="flex flex-row justify-between">
          <Text className="text-amber-400 font-bold text-lg">Equipo</Text>
          <Text className="text-amber-400 font-bold text-lg">Puntos</Text>
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
