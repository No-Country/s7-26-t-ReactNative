import { useNavigation } from "@react-navigation/core";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import LogoType from "./LogoType";
import { UserContext } from "../context/UserContext";
import { useContext, Children } from "react";

export default function Tournaments({ data, fromHome }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const {setTournamentId, setCreatedBy} = useContext(UserContext);

  if (!data) {
    return <Text>Cargando</Text>
  }

  if (data.length == 0) {
    return <Text className="text-white">No hay Torneos</Text>
  }

  return (
    <ScrollView className="w-full">
      <View>
       
        { Children.toArray(
        data?.map((data) => (
          <>
            <TouchableOpacity
              key={data.id}
              onPress={() =>{

                navigation.navigate({
                  name: "VerTorneo",
                  params: { id: data.id, userId: data.userId },
                });
                setCreatedBy(data.userId);
                setTournamentId(data.id)
              }
              }
              style={{
                backgroundColor: colors.lightPrimary,
              }}
              className=" h-16 flex flex-row items-center justify-between border-b-2   py-[5rem] px-2 rounded mr-1 ml-1 mt-1"
            >
              <View  className="flex flex-row items-center justify-between ">
                {data.imagen ? (
                  <Image
                    className="rounded h-12 w-12 m-1"
                    style={{
                      resizeMode: "cover",
                    }}
                    source={{
                      uri: `${data.imagen}`,
                    }}
                  />
                ) : (
                  <Image
                    className="rounded h-12 w-12 m-1 "
                    style={{
                      resizeMode: "cover",
                    }}
                    source={require("../../assets/torneoSample.png")}
                  />
                )}
                <Text
                  style={{ color: colors.primaryText }}
                  className="font-semibold"
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
        )
        ))}
      </View>
    </ScrollView>
  );
}
