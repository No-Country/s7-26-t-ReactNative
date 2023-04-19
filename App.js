import "react-native-gesture-handler";
import { DrawerNavigation } from "./src/routes/Navigation";
import { NativeWindStyleSheet } from "nativewind";
import { getUserData } from "./src/firebase/getFunctions";
import { auth } from "./src/firebase/credentials";
import { UserContext } from "./src/context/UserContext";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Torneopalooza } from "./src/components/icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnBoarding1 } from "./src/screens/OnBoarding1";
import { OnBoarding2 } from "./src/screens/OnBoarding2";
import { OnBoarding3 } from "./src/screens/OnBoarding3";


NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const [onboarding, setOnboarding] = useState(null);
  const [screen, setScreen] = useState(1)
  const [user, setUser] = useState(null);
  const [tournamentId, setTournamentId] = useState(null);
  const [createdBy, setCreatedBy] = useState(null);

  const leaveOnboarding = async () => {
    await AsyncStorage.setItem('onboard', 'false');
    setOnboarding(false)
  };

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('onboard');
      console.log('onboarding: ' + value);

      if (value === null) {
        setOnboarding(true);
        await AsyncStorage.setItem('onboard', 'true');
      } else if (value === true) {
        setOnboarding(true);
        leaveOnboarding();
      } else {
        setOnboarding(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async (uid) => {
    if (uid) {
      const userData = await getUserData(uid);
      setUser(userData);
    }

    return null;
  };

  useEffect(() => {

    checkOnboarding()


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

  if (onboarding) {
    return(
      <View className="flex items-center h-screen justify-center">
        <Torneopalooza width={150} height={40} color="#F0C05A"/>
        
        {
          screen === 1?
          <OnBoarding1 screen={setScreen}/>  
          : screen === 2?
          <OnBoarding2 screen={setScreen}/>
          :
          <OnBoarding3 leave={leaveOnboarding}/>
        }
        
      </View>
    ) 
  }

  return (
    <UserContext.Provider value={ {user, setUser, tournamentId, setTournamentId, createdBy, setCreatedBy} }>
      <DrawerNavigation />
    </UserContext.Provider>
  );
}
