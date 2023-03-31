import React from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import appLigasYTorneos from "../firebase/appLigasYTorneos.json";
export default function Fixture() {
  return (
    <ScrollView>
      <View>
        {appLigasYTorneos.map((data) => (
          <>
            <TouchableOpacity className={`flex flex-row items-center`}>
              <Image
                style={{
                  resizeMode: "cover",
                  height: 70,
                  width: 70,
                }}
                source={{ uri: data.logo }}
              />
              <Text className="text-indigo-600" data={data} key={data.id}>
                {data.titulo}
              </Text>
            </TouchableOpacity>
          </>
        ))}
      </View>
    </ScrollView>
  );
}
