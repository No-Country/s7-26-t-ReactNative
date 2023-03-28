import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getFixture } from "../firebase/getFunctions";

export default function Fixture() {
  const [fixture, setFixture] = useState([]);

  const ordenarPorFecha =(a, b)=>{
    if (a.fecha < b.fecha) {
      return -1;
    }
    if (a.fecha > b.fecha) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    const fechas = getFixture("NoCountry", "NoCountry");
    fechas.then((res) => setFixture(res)      
    );
  }, []);

  console.log("fixtures", fixture.sort(ordenarPorFecha));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tournament</Text>
      {fixture.map((partido, index) => (
        <View key={index}>
          <Text>Fecha: {partido.fecha}</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Text>Local: {partido.equipoLocal}</Text>
            <Text>{partido.resultadoLocal}</Text>
            <Text>:</Text>
            <Text>{partido.resultadoVisitante}</Text>
            <Text>Visitante: {partido.equipoVisitante}</Text>
          </View>
          <Text>{"\n"}</Text>
        </View>
      ))}

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
