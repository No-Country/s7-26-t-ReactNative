import { Text, View, Image } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";

export const OnBoarding2 = () => {
  const { colors } = useTheme();
  const navigate = useNavigation();

  return (
    <View
      style={{ backgroundColor: colors.darkPrimary }}
      className={`text-center h-full w-full`}
    >
      <Image
        className="w-350 h-250 self-center"
        source={require("../../assets/logotorneopalooza.png")}
      />
      <Image
        className="w-350 h-250"
        source={require("../../assets/playingHockey.png")}
      />

      <Text
        style={{ color: colors.textIcons }}
        className=" text-center text-xl m-4"
      >
        Los usuarios registrados pueden crear torneos, agregar equipos y
        organizar los partidos de forma aleatoria.
      </Text>
      <TouchableOpacity
        style={{ backgroundColor: colors.accentColor }}
        className="self-center"
        onPress={() => navigation.navigate("OnBoarding3")}
      >
        <Text>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};
