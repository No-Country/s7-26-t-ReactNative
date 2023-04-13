import { TouchableOpacity, View, StyleSheet } from "react-native";
import { SportCard } from "./SportCard";
import { ListSpecificTournaments } from "../firebase/getFunctions";

export const Sports = ({ setSport, setPartidos, setSportsScreen }) => {
    
  //lo paso en un array ya que se modifico la funcion para aceptar mas de un deporte
  async function getSpecificSport(tournament) {
    console.log("Filtro de Iconos");
    setSport(tournament);
    const data = await ListSpecificTournaments([tournament]);
    setPartidos(data);
    setSportsScreen(true);
  }

  return (
    <>
      <View className="h-auto rounded-sm items-center justify-center bg-transparent">
        <View className="flex-wrap flex-row justify-between">
          <View style={styles.container}>
            <TouchableOpacity onPress={() => getSpecificSport("Futbol")}>
              <SportCard title="Futbol" />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity onPress={() => getSpecificSport("Basquet")}>
              <SportCard title="Basquet" />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity onPress={() => getSpecificSport("Handball")}>
              <SportCard title="Handball" />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity onPress={() => getSpecificSport("Tenis")}>
              <SportCard title="Tenis" />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity onPress={() => getSpecificSport("Voley")}>
              <SportCard title="Voley" />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity onPress={() => getSpecificSport("E-Sport")}>
              <SportCard title="E-Sport" />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity onPress={() => getSpecificSport("Hockey")}>
              <SportCard title="Hockey" />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity onPress={() => getSpecificSport("Ciclismo")}>
              <SportCard title="Ciclismo" />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity onPress={() => getSpecificSport("Running")}>
              <SportCard title="Running" />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TouchableOpacity onPress={() => getSpecificSport("Natación")}>
              <SportCard title="Natación" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: "45%",
    textAlign: "center",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
});
