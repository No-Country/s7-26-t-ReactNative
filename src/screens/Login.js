import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity} from 'react-native';
import { loginWithEmailPassword } from '../firebase/getFunctions';


export default function Login({navigation}) {
  
  const { colors } = useTheme();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [response, setResponse] = useState("")

  async function save(){
    const resp = await loginWithEmailPassword(email, password)

    console.log(resp);

    setResponse("Bienvenido")

    setTimeout(() => {
      navigation.goBack()
    }, 300);
  }

  return (
    <KeyboardAvoidingView behavior='padding' className="flex justify-center items-center w-[280] h-full mx-auto">

      <View className="w-full flex gap-y-3">
      
      <Text style={{color: colors.text}} className="mr-auto -mb-3 text-base font-semibold opacity-60">Email</Text>
      <TextInput
        className="bg-white/10 border border-black/20 py-3 px-4 focus:border-indigo-600/50 w-full rounded-md"
        style={{color: colors.text}}
        onChangeText={nextValue => setEmail(nextValue)}
        value={email}
        placeholder='Your@email.com'
        placeholderTextColor={colors.text}
      />

      <Text style={{color: colors.text}} className="mr-auto -mb-3 text-base font-semibold opacity-60">Password</Text>
      <TextInput
        className="bg-white/10 border border-black/20 py-3 px-4 focus:border-indigo-600/50 w-full rounded-md -mb-1"
        style={{color: colors.text}}
        onChangeText={nextValue => setPassword(nextValue)}
        value={password}
        placeholder='Aa'
        placeholderTextColor={colors.text}
      />

      <TouchableOpacity className="bg-indigo-600 p-3 rounded-md" onPress={() => save()}>
        <Text className="text-white font-bold text-center text-base">Iniciar Sesión</Text>
      </TouchableOpacity>

      <Text style={{color: colors.text}}>{response}</Text>

      </View>
    </KeyboardAvoidingView>
  )
}