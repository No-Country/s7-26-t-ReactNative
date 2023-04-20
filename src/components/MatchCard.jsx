import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { updateGoals } from "../firebase/updateFunctions";
import { UserContext } from "../context/UserContext";

export default function MatchCard({ partido, editorMode }) {

  const {user} = useContext(UserContext)
  const [updateTitle, setUpdateTitle] = useState("Actualizar")
  const [updateMatch, setUpdateMatch] = useState(false)
  const [goals, setGoals] = useState({
    ...partido,
    golesLocal: partido.golesLocal,
    golesVisitante: partido.golesVisitante
  })

  async function updateResults(){
    let res = await updateGoals(user.id, partido.tournamentId, partido.id, goals)

    if (res) {
      setUpdateTitle("Actualizado")
      setTimeout(() => {
        setUpdateTitle("Actualizar")
      }, 700);
    }
  }

  const { colors } = useTheme();
  return (
    <View
      className="flex p-4 px-3 my-2 rounded-md w-[90%] mx-auto relative"
      style={{ backgroundColor: colors.primaryText }}
      key={partido.id}
    >
      {
        editorMode?
        <TouchableOpacity className="absolute right-0 top-0 p-2" onPress={() => setUpdateMatch(!updateMatch)}>
          <FontAwesome name="edit" size={25} color="white"></FontAwesome>
        </TouchableOpacity>
        :
        null
      }
      <Text className="text-violet-500">Fecha: {partido.round}</Text>
      <View className="flex-row justify-between py-1 ">
        <View className="w-[40%] py-2">
          <Text className="text-white text-center">{partido.player1}</Text>
          {
            editorMode && updateMatch?
            <TextInput
              keyboardType="numeric"
              className="bg-white/5 py-1 text-white text-center"
              value={String(goals.golesLocal)}
              onChangeText={text => setGoals({
                ...goals,
                golesLocal: text
              })}
            />
            :
            <Text className="text-white text-center">{partido.golesLocal}</Text>
          }
        </View>
        <Text
          className="w-[20%] text-center py-2"
          style={{ color: colors.accentColor }}
        >
          vs
        </Text>
        <View className="w-[40%] py-2">
          <Text className="text-white text-center">{partido.player2}</Text>
          {
            editorMode && updateMatch?
            <TextInput
              keyboardType="numeric"
              className="bg-white/5 py-1 text-white text-center"
              value={String(goals.golesVisitante)}
              onChangeText={text => setGoals({
                ...goals,
                golesVisitante: text
              })}
            />
            :
            <Text className="text-white text-center">{partido.golesVisitante}</Text>
          }
        </View>
      </View>
      {
        editorMode && updateMatch?
        <TouchableOpacity onPress={() => updateResults()} className="items-center">
          <Text className="bg-yellow-400 font-semibold text-black/80 px-2 py-1">{updateTitle}</Text>
        </TouchableOpacity>
        :
        null
      }
    </View>
  );
}