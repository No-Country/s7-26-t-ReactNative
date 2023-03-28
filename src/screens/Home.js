import { useState, useEffect } from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {auth} from '../firebase/credentials';
import { logOut } from '../firebase/getFunctions';

 function Home({navigation}) {

  const [user, setUser] = useState([])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        setUser(user);
      } else {
        // User is logged out
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <ScrollView className="h-full">
    <View className="flex items-center mx-auto justify-center gap-y-4 h-full">
      <View className="flex flex-col gap-y-4">
      {
        !user?.email?
        <>
        <TouchableOpacity className="bg-indigo-600 p-3 rounded-md" onPress={() => navigation.navigate("Login")}>
          <Text className="text-white font-bold text-center text-base">Iniciar Sesion</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-indigo-600 p-3 rounded-md" onPress={() => navigation.navigate("Register")}>
          <Text className="text-white font-bold text-center text-base">Registro</Text>
        </TouchableOpacity>
        </>
        :
        undefined
      }
      </View>

      <Text className="text-teal-500 text-2xl">Tournament App</Text>
      <Text className="text-teal-500 text-xl">S7 - 26 - React Native</Text>

      {
        user?.email?
        <Text className="text-indigo-600">Hola {user?.email}</Text>
        :
        undefined
      }

      {
        user?
        <TouchableOpacity className="bg-indigo-600 p-3 rounded-md" onPress={() => logOut()}>
          <Text className="text-white font-bold text-center text-base">Cerrar Sesion</Text>
        </TouchableOpacity>
        :
        undefined
      }

    </View>
    </ScrollView>
  );
}

export default Home;