import "react-native-gesture-handler";
import { DrawerNavigation } from "./src/routes/Navigation";
import { NativeWindStyleSheet } from "nativewind";
import { getUserData } from "./src/firebase/getFunctions";
import { auth } from "./src/firebase/credentials";
import { UserContext } from "./src/context/UserContext";
import { useEffect, useState } from "react";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const [user, setUser] = useState(null);
  const [tournamentId, setTournamentId] = useState(null);
  const [createdBy, setCreatedBy] = useState(null);
  const fetchUser = async (uid) => {
    if (uid) {
      const userData = await getUserData(uid);
      setUser(userData);
    }

    return null;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.uid) {
          fetchUser(user.uid);
        }
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={ {user, setUser, tournamentId, setTournamentId, createdBy, setCreatedBy} }>
      <DrawerNavigation />
    </UserContext.Provider>
  );
}
