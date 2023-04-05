import { useNavigation } from "@react-navigation/core";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import LogoType from "./LogoType";



export default function Tournaments({ data }) {
  const navigation = useNavigation();
  if (!data) {
    return <Text>Cargando</Text>;
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
                  params: { id: data.id },
                })
              }
              className="h-16  flex flex-row items-center justify-between border-b-2 bg-gray-100 drop-shadow-sm hover:bg-gray-150 py-[5rem] px-2 rounded mr-1 ml-1 mt-1"
            >
              <View className="flex flex-row items-center justify-between">
                <Image
                  className="rounded h-12 w-12 m-1"
                  style={{
                    resizeMode: "cover",
                  }}
                  source={{
                    uri: "https://t3.ftcdn.net/jpg/04/29/81/28/360_F_429812841_tNy97zTP9PJOp2Bo8G2F2Li5RCqyZlnI.jpg",
                  }}
                />
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
