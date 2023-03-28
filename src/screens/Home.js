import { Button, Text, TouchableOpacity, View } from 'react-native';

 function Home({navigation}) {
  return (
    <View className="flex items-center mx-auto justify-center gap-y-4 h-full">
      <View className="flex flex-col gap-y-4">
      <TouchableOpacity className="bg-indigo-600 p-3 rounded-md" onPress={() => navigation.navigate("Login")}>
        <Text className="text-white font-bold text-center text-base">Iniciar Sesion</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-indigo-600 p-3 rounded-md" onPress={() => navigation.navigate("Register")}>
        <Text className="text-white font-bold text-center text-base">Registro</Text>
      </TouchableOpacity>
      </View>

      <Text className="text-teal-500 text-2xl">Tournament App</Text>
      <Text className="text-teal-500 text-xl">S7 - 26 - React Native</Text>
    </View>
  );
}

export default Home;