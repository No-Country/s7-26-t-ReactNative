import { useTheme } from '@react-navigation/native';
import { useState, useEffect, Children } from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ListTournaments } from '../firebase/getFunctions';

 function Home({}) {

  const { colors } = useTheme()

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

      <Text onPress={() => getTournaments()} className="p-2 bg-indigo-600 my-4" style={{color: colors.text}}>Obtener Partidos</Text>
      {
        partidos?
        Children.toArray(
          partidos.map(partido => (
            <View className="flex p-2 my-1 bg-slate-700/70 w-[70%]">
              <Text className="text-lg" style={{color: colors.text}}>{partido.nombre}</Text>
              <Text style={{color: colors.text}}>Creado por {partido.creador}</Text>
              <Text style={{color: colors.text}}>En {partido.ciudad}</Text>
              <Text style={{color: colors.text}}>{partido.descripcion}</Text>
            </View>
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