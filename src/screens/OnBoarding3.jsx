import { Text, View, Image } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";

export const OnBoarding3 = () => {
  const { colors } = useTheme();
  const navigate = useNavigation();

  return (
    <View
      style={{ backgroundColor: colors.darkPrimary }}
      className={`text-center h-full  w-full`}
    >
      <Image
        style={{
          width: 316,
          height: 200,
          resizeMode: "contain",
        }}
        className="w-350 h-250 self-center"
        source={require("../../assets/logotorneopalooza.png")}
      />
      <Image
        className="w-350 h-250 self-center"
        source={require("../../assets/playingFootball.png")}
      />

      <Text
        style={{ color: colors.primaryText }}
        className=" text-center text-xl m-4"
      >
        Torneo Palooza está diseñada para que la organización de torneos amateur
        sea lo más sencilla posible y que los fanáticos del deporte se mantengan
        informados.
      </Text>

      <TouchableOpacity
        style={{ backgroundColor: colors.accentColor, elevation: 6 }}
        className="self-center w-36 h-11 justify-center items-center rounded-md m-10"
        onPress={() => navigation.navigate("Inicio")}
      >
        <Text className="text-xl font-medium">Continuar</Text>
      </TouchableOpacity>
      <View className="flex flex-row justify-between self-center w-36">
        <Octicons name="dot" size={24} style={{ color: colors.accentColor }} />
        <Octicons name="dot" size={24} style={{ color: colors.accentColor }} />
        <Octicons
          name="dot-fill"
          size={24}
          style={{ color: colors.accentColor }}
        />
      </View>
    </View>
  );
};
