import { View, Text, ScrollView } from "react-native";

export default function TournamenTable({ teams }) {
  return (
    <View className="w-full min-h-[300px] bg-purple-400 my-4 ">
      <View className={"flex p-2 my-6 w-[90%] mx-auto "}>
        <Text className="text-white text-xl my-2">Posiciones: </Text>
        <ScrollView horizontal className="h-auto">
          <ScrollView>
            <View className="flex flex-row bg-purple-700">
              <Text className="text-md w-12"> </Text>
              <Text className="text-amber-400 font-bold text-md w-40">
                Equipo
              </Text>
              <Text className="text-amber-400 font-bold text-md w-12">
                Ptos
              </Text>
              <Text className="text-amber-400 font-bold text-md w-12">PJ</Text>
              <Text className="text-amber-400 font-bold text-md w-12">PG</Text>
              <Text className="text-amber-400 font-bold text-md w-12">PE</Text>
              <Text className="text-amber-400 font-bold text-md w-12">PP</Text>
            </View>
            {teams.length > 0 ? (
              teams.map((team, index) => (
                <View
                  className={`flex flex-row  py-1 border-b border-amber-100 ${
                    index % 2 ? "bg-blue-900" : "bg-blue-800"
                  }`}
                  key={team.id}
                >
                  <Text className="text-white w-12 text-center">
                    {index + 1}º
                  </Text>
                  <Text className="text-white w-40 ">{team.nombre}</Text>
                  <Text className="text-white w-12 text-center ">
                    {team.puntos}
                  </Text>
                  <Text className="text-white w-12 text-center ">
                    {team.partidosJugados}
                  </Text>
                  <Text className="text-white w-12 text-center ">
                    {team.partidosGanados}
                  </Text>
                  <Text className="text-white w-12 text-center ">
                    {team.partidosEmpatados}
                  </Text>
                  <Text className="text-white w-12 text-center ">
                    {team.partidosPerdidos}
                  </Text>
                </View>
              ))
            ) : (
              <Text className="text-violet-600">No hay equipos</Text>
            )}
          </ScrollView>
        </ScrollView>
      </View>
    </View>
  );
}
