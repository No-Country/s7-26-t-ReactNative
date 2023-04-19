import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { OnBoarding2 } from "./OnBoarding2";

export const OnBoarding1 = () => {
  const { colors } = useTheme();
  const navigate = useNavigation();

  return (
    <View
      style={{ backgroundColor: colors.darkPrima }}
      className={`text-center h-full w-full`}
    >
      <Image
        className="w-350 h-250 self-center"
        source={require("../../assets/logotorneopalooza.png")}
      />
      <Image
        className="w-350 h-250"
        source={require("../../assets/tournamentSample.png")}
      />

      <Text
        style={{ color: colors.textIcons }}
        className=" text-center text-xl m-4"
      >
        En Torneo Palooza podés crear torneos para deportes amateur. Tanto los
        usuarios invitados como los registrados pueden encontrar torneos de sus
        deportes favoritos.
      </Text>
      <TouchableOpacity
        style={{ backgroundColor: colors.accentColor }}
        className="self-center"
        onPress={() => navigation.navigate("OnBoarding2")}
      >
        <Text>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};
