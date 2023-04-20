import { View, Text, ScrollView, Image } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function TournamenTable({ teams }) {
  return (
    <View className="w-full h-[62%] bg-white my-4 pb-8 rounded-xl">
      <View className="flex p-2 my-6 w-[94%] mx-auto">
        <Text className="text-black text-xl my-2 font-semibold text-center">Posiciones </Text>
        <ScrollView horizontal className="h-full w-full py-2 ">
          <ScrollView className="w-full">
            {teams.length > 0 ? (
              <>
                <TableHeader />
                {teams.map((team, index) => (
                  <TableRow team={team} index={index} key={team.id}/>
                ))}
              </>
            ) : (
              <Text className="text-black py-4">No hay equipos</Text>
            )}
          </ScrollView>
        </ScrollView>
      </View>
    </View>
  );
}

function TableHeader() {
  const { colors } = useTheme();

  return (
    <View
      className={"flex flex-row py-4"}
      style={{ backgroundColor: colors.primaryColor }}
    >
      <Text className="text-base w-12"> </Text>
      <Text
        className="font-bold text-base w-40"
        style={{ color: colors.accentColor }}
      >
        Equipo
      </Text>
      <Text
        className="font-bold text-base w-12 text-center"
        style={{ color: colors.accentColor }}
      >
        Ptos
      </Text>
      <Text
        className="font-bold text-base w-12 text-center"
        style={{ color: colors.accentColor }}
      >
        PJ
      </Text>
      <Text
        className="font-bold text-base w-12 text-center"
        style={{ color: colors.accentColor }}
      >
        PG
      </Text>
      <Text
        className="font-bold text-base w-12 text-center"
        style={{ color: colors.accentColor }}
      >
        PE
      </Text>
      <Text
        className="font-bold text-base w-12 text-center"
        style={{ color: colors.accentColor }}
      >
        PP
      </Text>
    </View>
  );
}

function TableRow({ index, team }) {
  const { colors } = useTheme();
  return (
    <View
      className={"flex flex-row items-center py-2 border-b border-gray-200"}
      style={{
        backgroundColor: `${
          index % 2 ? colors.secondaryText : colors.dividerColor
        }`,
      }}
    >
      <Text className="text-white w-12 text-center">{index + 1}º</Text>
      <View className="w-40 flex-row items-center" >
        <Image source={{ uri: team.imagen }} className="w-8 h-8 rounded-full" />
        <Text className="text-white ml-2">{team.nombre}</Text>
      </View>
      <Text className="text-white w-12 text-center ">{team.puntos}</Text>
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
  );
}
