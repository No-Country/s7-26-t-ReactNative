import { Text, View, Image, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { RootColors } from "../theme";
import { ScrollView } from "react-native-gesture-handler";
import { Torneopalooza } from "../components/icons";

export const OnBoarding1 = ({ screen }) => {
  const { colors } = RootColors;

  return (
    <ScrollView style={{ backgroundColor: colors.lightPrimary }}>
      <View
        className={`text-center items-center h-screen justify-around w-full py-10`}
      >
        <Torneopalooza width={316} height={100} color={colors.darkPrimary} />
        <Image
          style={{
            resizeMode: "contain",
            width: 250,
            height: 250,
          }}
          className="self-center"
          source={require("../../assets/tournamentSample.png")}
        />
        <Text
          style={{ color: colors.primaryText }}
          className=" text-center text-3xl font-semibold mb-7"
        >
          ¡Bienvenido!
        </Text>
        <Text
          style={{ color: colors.primaryText }}
          className="text-center text-lg p-2"
        >
          En Torneo Palooza podés crear torneos para deportes amateur. Tanto los
          usuarios invitados como los registrados pueden encontrar torneos de
          sus deportes favoritos.
        </Text>
        <TouchableOpacity
          style={{ backgroundColor: colors.accentColor, elevation: 6 }}
          className="self-center w-36 h-11 justify-center items-center rounded-md my-8"
          onPress={() => screen(2)}
        >
          <Text className="text-xl font-medium">Continuar</Text>
        </TouchableOpacity>
        <View className="flex flex-row justify-between self-center mt-4 w-36">
          <Octicons
            name="dot-fill"
            size={24}
            style={{ color: colors.accentColor }}
          />
          <TouchableOpacity onPress={() => screen(2)}>
            <Octicons
              name="dot"
              size={24}
              style={{ color: colors.accentColor }}
            />
          </TouchableOpacity>
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
