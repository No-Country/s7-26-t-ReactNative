import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getTournament } from "../firebase/getFunctions";

const ViewTournament = ({route}) => {

  const { colors } = useTheme()
  const [torneo, setTorneo] = useState(null)

  async function getTorneo(uid){
    let data = await getTournament(uid)

    setTorneo(data)
  }

  useEffect(() => {
    if (route?.params?.uid) {
      getTorneo(route.params.uid)
    }
    
  }, [])

  return (
    <>
    {
      torneo?
      <View className="flex items-start gap-y-1 py-6 px-4">
        <Text style={{color: colors.text}} className="text-2xl font-bold my-4">Torneo: {torneo.nombre}</Text>
        <Text className="text-lg font-bold bg-indigo-600 px-2 text-white">{torneo.deporte}</Text>
        <Text style={{color: colors.text}} className="text-lg font-bold">Creado por: {torneo.creador}</Text>
        <Text style={{color: colors.text}} className="text-lg font-bold">Region: {torneo.region}</Text>
        <Text style={{color: colors.text}} className="text-lg font-bold">Ciudad: {torneo.ciudad}</Text>
        <Text style={{color: colors.text}} className="text-lg font-bold -mb-3">Descripción:</Text>
        <Text style={{color: colors.text}} className="text-lg font-bold">{torneo.descripcion}</Text>
      </View>
      :
      <Text>Este Torneo no Existe</Text>
    }
    </>
  )
}

export default ViewTournament
