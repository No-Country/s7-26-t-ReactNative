import { Text, TouchableOpacity, View } from "react-native";
import Tournaments from "../components/Tournaments";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { getUserTournaments } from "../firebase/getFunctions";
import Loader from "../components/Loader";
import { useNavigation, useTheme } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import { db, mainCollection } from "../firebase/credentials";
import { UserContext } from "../context/UserContext";

export default function MyFollows() {
  const { user} = useContext(UserContext)
  const { colors } = useTheme();
  const [follows, setFollows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation()

  useLayoutEffect(() => {
    setLoading(true);
  }, []);


  useEffect(() => {
    const savedProfiles = onSnapshot(
      collection(db, mainCollection, user.id, "Saved"),
      (snapshot) => {
        let temp = [];
        snapshot.forEach((doc) => temp.push(doc.data()));
        setFollows(temp);
      }
    );
    setLoading(false)
    return savedProfiles;
  },[])


  return (
    <View className="w-full h-full">
      {loading ? (
        <Loader />
      ) : follows.length > 0 ? (
        <>
          <View className="py-10">
            <Text
              className="text-2xl text-center"
              style={{ color: colors.primaryText }}
            >
              Mis torneos seguidos
            </Text>
          </View>
          <Tournaments data={follows} />
        </>
      ) : (
        <View className="w-full h-full flex justify-center items-center px-8">
          <Text
            className="text-2xl text-center font-semibold py-4"
            style={{ color: colors.primaryText }}
          >
            No sigues a ningún torneo aún
          </Text>
          <TouchableOpacity
            style={{ backgroundColor: colors.accentColor }}
            className="p-4 rounded-lg my-8"
            onPress={() =>
              navigation.navigate("Inicio")
            }
          >
            <Text className="font-medium text-base">Ir al Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
