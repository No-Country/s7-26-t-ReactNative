import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Text, View } from "react-native";
import { getTournament, getTournamentTeams } from "../firebase/getFunctions";
import TournamentDetails from "../components/TournamentDetails";
import { ordenarPorPuntos } from "../utils";
import TournamenTable from "../components/TournamentTable";
import { useTheme } from "@react-navigation/native";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";

const ViewTournament = ({ route }) => {
  const [torneo, setTorneo] = useState(null);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();
  const {createdBy, tournamentId} = useContext(UserContext)

  async function getTorneo(id) {
    let data = await getTournament(id);
    setTorneo(data[0]);
    setLoading(false);
  }

  useEffect(() => {
    if (route?.params?.id) {
      getTorneo(route.params.id);
      const data1 = getTournamentTeams(createdBy, tournamentId);
      data1.then((res) => setTeams(res));
    }
  }, [createdBy,tournamentId]);
  teams.sort(ordenarPorPuntos);

  useLayoutEffect(() => {
    setLoading(true)
  }, [tournamentId])

  return (
    <>
      <View className="flex justify-start gap-y-4 py-6 px-4 h-full">
        {loading ? (
          <Loader />
        ) : (
          <>
            {torneo ? (
              <>
                <TournamentDetails item={torneo} />
                <TournamenTable teams={teams} />
              </>
            ) : (
              <Text>Este Torneo no Existe</Text>
            )}
          </>
        )}
      </View>
    </>
  );
};

export default ViewTournament;
