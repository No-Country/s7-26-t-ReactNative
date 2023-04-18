import { Text, TouchableOpacity, View } from "react-native";
import Tournaments from "../components/Tournaments";
import { useEffect, useLayoutEffect, useState } from "react";
import { getUserTournaments } from "../firebase/getFunctions";
import Loader from "../components/Loader";
import { useTheme } from "@react-navigation/native";

export default function MyTournaments({ navigation, route }) {
  const [myTournaments, setMyTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();

  const { id, username } = route.params;

  useEffect(() => {
    const data = getUserTournaments(id);
    data.then((res) => setMyTournaments(res));
    setLoading(false);
  }, []);
  useLayoutEffect(() => {
    setLoading(true);
  }, []);

  return (
    <View className="w-full h-full">
      {loading ? (
        <Loader />
      ) : myTournaments.length > 0 ? (
        <>
          <View className="py-10">
            <Text
              className="text-2xl text-center"
              style={{ color: colors.primaryText }}
            >
              Mis torneos
            </Text>
          </View>
          <Tournaments data={myTournaments} />
          <View className="flex justify-center items-center">
            <TouchableOpacity
              style={{ backgroundColor: colors.accentColor }}
              className="p-4 rounded-lg my-8"
              onPress={() =>
                navigation.navigate("CrearTorneo", {
                  username: username,
                })
              }
            >
              <Text>Crear Torneo</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className="w-full h-full flex justify-center items-center">
          <Text
            className="text-3xl text-center py-4"
            style={{ color: colors.primaryText }}
          >
            No tienes torneos
          </Text>
          <TouchableOpacity
            style={{ backgroundColor: colors.accentColor }}
            className="p-4 rounded-lg my-8"
            onPress={() =>
              navigation.navigate("CrearTorneo", {
                username: username,
              })
            }
          >
            <Text>Crear Torneo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
