import React from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import appLigasYTorneos from "../firebase/appLigasYTorneos.json";
export default function Fixture() {
  return (
    <ScrollView>
      <View>
        {appLigasYTorneos.map((data) => (
          <>
            <TouchableOpacity className="h-16 flex flex-row items-center justify-between border-b-2 bg-gray-100 drop-shadow-sm hover:bg-gray-150 py-[5rem] px-2 rounded mr-1 ml-1 mt-1">
              <View className="h-16 flex flex-row items-center justify-between">
                <Image
                  className="rounded h-12 w-12 m-1"
                  style={{
                    resizeMode: "cover",
                  }}
                  source={{ uri: data.logo }}
                />
                <Text
                  className="text-indigo-600 font-semibold"
                  data={data}
                  key={data.id}
                >
                  {data.titulo}
                </Text>
              </View>
              <Image
                className="rounded h-12 w-12 m-1"
                style={{
                  resizeMode: "cover",
                }}
                source={{ uri: data.logo }}
              />
            </TouchableOpacity>
          </>
        ))}
      </View>
    </ScrollView>
  );
}
