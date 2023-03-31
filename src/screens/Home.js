import { Link, useTheme } from '@react-navigation/native';
import { useState, useEffect, Children } from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ListTournaments } from '../firebase/getFunctions';

 function Home({navigation}) {

  const { dark, colors } = useTheme()

  const [partidos, setPartidos] = useState(null)

  async function getTournaments(){
    const data = await ListTournaments()
    setPartidos(data)
  }

  return (
    <ScrollView className="h-full">
    <View className="flex items-center mx-auto my-4 justify-center h-full w-full">

      <Text style={{color: colors.text}} className="text-5xl">Torneopalooza</Text>
      <Text style={{color: colors.text}} className="text-2xl">S7-26T React Native</Text>

      <Text onPress={() => getTournaments()} className="p-2 bg-indigo-600 my-4 text-white">Obtener Partidos</Text>
      {
        partidos?
        Children.toArray(
          partidos.map(partido => (
            <>
              <TouchableOpacity className={"flex p-2 px-3 my-1 rounded "+(dark? "bg-slate-700/60" : "bg-black/90")} onPress={() => navigation.navigate({name: "VerTorneo", params: {uid: partido.uid}})}>
                <Text className="text-white text-xl">{partido.nombre}</Text>
                <Text className="text-white">{partido.deporte}</Text>
                <Text className="text-white">Creado por {partido.creador}</Text>
                <Text className="text-white">En {partido.ciudad}</Text>
              </TouchableOpacity>
            </>
          ))
        )
        :
        undefined
      }
    </View>
    </ScrollView>
  );
}

export default Home;