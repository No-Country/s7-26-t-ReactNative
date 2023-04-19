import { useTheme } from "@react-navigation/native";
import { Text, View } from "react-native";

export default function MatchCard({ partido }) {
  const { colors } = useTheme();
  return (
    <View
      className="flex p-4 px-3 my-2 rounded-md w-[90%] mx-auto "
      style={{ backgroundColor: colors.primaryText }}
      key={partido.id}
    >
      <Text className="text-violet-500">Fecha: {partido.round}</Text>
      <View className="flex-row justify-between py-1 ">
        <View className="w-[40%] py-2">
          <Text className="text-white text-center">{partido.player1}</Text>
          <Text className="text-white text-center">-</Text>
        </View>
        <Text
          className="w-[20%] text-center py-2"
          style={{ color: colors.accentColor }}
        >
          vs
        </Text>
        <View className="w-[40%] py-2">
          <Text className="text-white text-center">{partido.player2}</Text>
          <Text className="text-white text-center">-</Text>
        </View>
      </View>
    </View>
  );
}