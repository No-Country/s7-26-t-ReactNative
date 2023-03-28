import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getUserTournamentData } from "../firebase/getFunctions";

export default function Tournament() {
  const [tournament, setTournament] = useState('');

  useEffect(()=>{
    const tournamentData = getUserTournamentData("NoCountry", "NoCountry")
    tournamentData.then(res => setTournament(res))
  },[])
  console.log(tournament)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tournament.titulo}</Text>
      <Text>Provincia: {tournament.provincia}</Text>
      <Text>Cantidad de equipos: {tournament.cantidadEquipos}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    color: "teal",
  },
});
