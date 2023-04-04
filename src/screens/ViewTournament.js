import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getTournament, getTournamentTeams } from "../firebase/getFunctions";
import TournamentDetails from "../components/TournamentDetails";
import { ordenarPorPuntos } from "../utils";
import TournamenTable from "../components/TournamenTable";

const ViewTournament = ({ route }) => {
  const [torneo, setTorneo] = useState(null);
  const [teams, setTeams] = useState([]);

  async function getTorneo(id) {
    let data = await getTournament(id);
    setTorneo(data[0]);
  }

  useEffect(() => {
    if (route?.params?.id) {
      getTorneo(route.params.id);

      const data1 = getTournamentTeams(route.params.userId, route.params.id);
      data1.then((res) => setTeams(res));
    }
  }, []);
  teams.sort(ordenarPorPuntos);

  return (
    <>
      <View className="flex items-start gap-y-4 py-6 px-4 h-full">
        {torneo ? (
          <>
            <TournamentDetails item={torneo} />
            <TournamenTable teams={teams} />
            
          </>
        ) : (
          <Text>Este Torneo no Existe</Text>
        )}
      </View>
    </>
  );
};

export default ViewTournament;
