import { Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { OnBoarding2 } from "./OnBoarding2";
import { Octicons } from "@expo/vector-icons";

export const OnBoarding1 = () => {
  const { colors } = useTheme();
  const navigate = useNavigation();

  return (
    <View
      style={{ backgroundColor: colors.darkPrimary }}
      className={`text-center h-full w-full`}
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
        className="w-350 h-250  self-center"
        source={require("../../assets/tournamentSample.png")}
      />

      <Text
        style={{ color: colors.primaryText }}
        className=" text-center text-xl m-4"
      >
        En Torneo Palooza podés crear torneos para deportes amateur. Tanto los
        usuarios invitados como los registrados pueden encontrar torneos de sus
        deportes favoritos.
      </Text>
      <TouchableOpacity
        style={{ backgroundColor: colors.accentColor, elevation: 6 }}
        className="self-center w-36 h-11 justify-center items-center rounded-md m-10"
        onPress={() => navigation.navigate("OnBoarding2")}
      >
        <Text className="text-xl font-medium">Continuar</Text>
      </TouchableOpacity>
      <View className="flex flex-row justify-between self-center w-36">
        <Octicons
          name="dot-fill"
          size={24}
          style={{ color: colors.accentColor }}
        />
        <Octicons name="dot" size={24} style={{ color: colors.accentColor }} />
        <Octicons name="dot" size={24} style={{ color: colors.accentColor }} />
      </View>
    </View>
  );
};
