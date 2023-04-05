import { useNavigation } from "@react-navigation/core";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import LogoType from "./LogoType";
import tournamentLogo from "../../assets/tournamentLogo.png";

export default function Tournaments({ data }) {
  const navigation = useNavigation();
  if (!data) {
    return <Text>Cargando</Text>;
  }


if (data.length == 0){
  return <Text className="text-white">No hay torneo</Text>
}

  return (
    <ScrollView className="w-full">
      <View>
        {data?.map((data) => (
          <>
            <TouchableOpacity
              key={data.id}
              onPress={() =>
                navigation.navigate({
                  name: "VerTorneo",
                  params: { id: data.id, userId: data.userId },
                })
              }
              className="h-16  flex flex-row items-center justify-between border-b-2 bg-gray-100 drop-shadow-sm hover:bg-gray-150 py-[5rem] px-2 rounded mr-1 ml-1 mt-1"
            >
              <View className="flex flex-row items-center justify-between">
                {data.imagen && (
                  <Image
                    className="rounded h-12 w-12 m-1"
                    style={{
                      resizeMode: "cover",
                    }}
                    source={{
                      uri: `${data.imagen}`,
                    }}
                  />
                )}
                <Text
                  className="text-indigo-600 font-semibold"
                  data={data}
                  key={data.id}
                >
                  {data.nombre}
                </Text>
              </View>
              <LogoType data={data} />
              {/* <Text className="m-2">{data.deporte}</Text> */}
            </TouchableOpacity>
          </>
        ))}
      </View>
    </ScrollView>
  );
}
