import React from "react";
import { ScrollView, Text, View, Image } from "react-native";
import appLigasYTorneos from "../firebase/appLigasYTorneos.json";
export default function Fixture() {
  return (
    <ScrollView>
      <View>
        {appLigasYTorneos.map((data) => (
          <>
            <Text data={data} key={data.id}>
              {data.titulo}
            </Text>
            <View className={`flex flexrow items-center`}>
              <Image
                style={{
                  resizeMode: "cover",
                  height: 100,
                  width: 200,
                }}
                source={{ uri: data.logo }}
              />
            </View>
          </>
        ))}
      </View>
    </ScrollView>
  );
}
