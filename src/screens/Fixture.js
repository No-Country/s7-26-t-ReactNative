import { useRoute, useTheme } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { UserContext } from "../context/UserContext";
import { getFixture } from "../firebase/getFunctions";

export default function Fixture({ route }) {
  const [fixture, setFixture] = useState([]);
  const { dark, colors } = useTheme();
  const { user, tournamentId } = useContext(UserContext);
  const { id } = useRoute().params;

  useEffect(() => {
    //Me lee el parametro
    console.log("Id torneo: ", `${id}`);
    console.log("Id torneo: ", tournamentId);

    //Pero la funcion no me lo toma
    /* const data = getFixture(user?.id, id); */
    
    //Solo cuando paso el id como string literal
    const data = getFixture(user?.id, "ceyjOmpGpcW9P6EHN6t6");
    
    data.then((res) => setFixture(res));

    /*     data.then((res) => setFixture(res));
    console.log(fixture);
    console.log(tournamenId); */
  }, [id]);

  return (
    <View className="flex items-center mx-auto justify-center h-full w-full">
      { fixture.length > 0 ? fixture.map((partido) => (
        <View
          className={
            "flex p-2 px-3 my-1 rounded w-[90%] mx-auto " +
            (dark ? "bg-slate-700/60" : "bg-black/90")
          }
        >
          <Text className="text-violet-500">Fecha: {partido.fecha}</Text>
          <Text className="text-white">{partido.equipoLocal}</Text>
          <Text className="text-yellow-600">vs</Text>
          <Text className="text-white">{partido.equipoVisitante}</Text>
        </View>
      )) : 
      <View className="flex justify-center items-center">
        <Text className="text-violet-600">No hay fixture aún</Text>
      </View>
      }
    </View>
  );
}
