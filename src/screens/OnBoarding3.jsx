import { Text, View, Image, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { RootColors } from "../theme";
import { ScrollView } from "react-native-gesture-handler";
import { Torneopalooza } from "../components/icons";

export const OnBoarding3 = ({ leave, screen }) => {
  const { colors } = RootColors;

  return (
    <ScrollView style={{ backgroundColor: colors.lightPrimary }}>
      <View
        style={{ backgroundColor: colors.lightPrimary }}
        className={`text-center w-full pt-20 h-screen justify-around items-center `}
      >
        <Torneopalooza width={316} height={100} color={colors.darkPrimary} />
        <Image
          style={{
            resizeMode: "contain",
            width: 250,
            height: 250,
          }}
          className="self-center"
          source={require("../../assets/playingFootball.png")}
        />

        <Text
          style={{ color: colors.primaryText }}
          className=" text-center text-xl m-4"
        >
          Torneo Palooza está diseñada para que la organización de torneos
          amateur sea lo más sencilla posible y que los fanáticos del deporte se
          mantengan informados.
        </Text>

        <TouchableOpacity
          style={{ backgroundColor: colors.accentColor, elevation: 6 }}
          className="self-center w-36 h-11 justify-center items-center rounded-md mt-8 mb-4"
          onPress={() => leave()}
        >
          <Text className="text-xl font-medium">Continuar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="self-center justify-center items-center mb-8"
          onPress={() => screen(2)}
        >
          <Text className="text-base underline font-medium">Atrás</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row justify-between self-center w-36"
          onPress={() => screen(3)}
        >
          <TouchableOpacity onPress={() => screen(1)}>
            <Octicons
              name="dot"
              size={24}
              style={{ color: colors.accentColor }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => screen(2)}>
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
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
