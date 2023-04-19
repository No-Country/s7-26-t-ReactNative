import { Text, View, Image } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";

export const OnBoarding3 = () => {
  const { colors } = useTheme();
  const navigate = useNavigation();

  return (
    <View
      style={{ backgroundColor: colors.darkPrimary }}
      className={`text-center h-full  w-full`}
    >
      <Image
        className="w-350 h-250 self-center"
        source={require("../../assets/logotorneopalooza.png")}
      />
      <Image
        className="w-350 h-250 self-center"
        source={require("../../assets/playingFootball.png")}
      />

      <Text
        style={{ color: colors.textIcons }}
        className=" text-center text-xl m-4"
      >
        Torneo Palooza está diseñada para que la organización de torneos amateur
        sea lo más sencilla posible y que los fanáticos del deporte se mantengan
        informados.
      </Text>
      <TouchableOpacity
        style={{ backgroundColor: colors.accentColor }}
        className="self-center"
        onPress={() => navigation.navigate("Inicio")}
      >
        <Text>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};
