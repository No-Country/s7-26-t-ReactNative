import { Text, View, Image, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { RootColors } from "../theme";
import { ScrollView } from "react-native-gesture-handler";
import { Torneopalooza } from "../components/icons";

export const OnBoarding2 = ({ screen }) => {
  const { colors } = RootColors;

  return (
    <ScrollView style={{ backgroundColor: colors.lightPrimary }}>
      <View
        className={`text-center h-screen justify-between items-center w-full pt-20`}
      >
        <Torneopalooza width={316} height={100} color={colors.darkPrimary} />
        <Image
          style={{
            resizeMode: "contain",
            width: 250,
            height: 250,
          }}
          className="self-center"
          source={require("../../assets/playingHockey.png")}
        />

        <Text
          style={{ color: colors.primaryText }}
          className=" text-center text-xl m4"
        >
          Los usuarios registrados pueden crear torneos, agregar equipos y
          organizar los partidos de forma aleatoria.
        </Text>

        <TouchableOpacity
          style={{ backgroundColor: colors.accentColor, elevation: 6 }}
          className="self-center w-36 h-11 justify-center items-center rounded-md mt-8 mb-4"
          onPress={() => screen(3)}
        >
          <Text className="text-xl font-medium">Continuar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="self-center justify-center items-center mb-8"
          onPress={() => screen(1)}
        >
          <Text className="text-base underline font-medium">Atrás</Text>
        </TouchableOpacity>
        <View className="flex flex-row justify-between self-center w-36">
          <TouchableOpacity onPress={() => screen(1)}>
            <Octicons
              name="dot"
              size={24}
              style={{ color: colors.accentColor }}
            />
          </TouchableOpacity>
          <Octicons
            name="dot-fill"
            size={24}
            style={{ color: colors.accentColor }}
          />
          <TouchableOpacity onPress={() => screen(3)}>
            <Octicons
              name="dot"
              size={24}
              style={{ color: colors.accentColor }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
