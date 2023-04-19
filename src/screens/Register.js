import { useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Platform,
  ScrollView,
  Pressable
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { registerUser } from "../firebase/auth";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { toastConfig } from "../components/Toast";

import { useTogglePasswordVisibility } from '../hooks/useToggleVisibility';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Ingresa almenos 3 caracteres")
    .required("El usuario es obligatorio"),
  email: Yup.string()
    .email("Email Invalido")
    .required("El Email es obligatorio"),
  password: Yup.string()
    .min(5, "Ingresa almenos 5 caracteres")
    .required("La Constraseña es obligatoria"),
});

export default function Register({ navigation }) {

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();
  const [password, setPassword] = useState('');

  const { colors } = useTheme();

  async function handleSubmit({ email, password, username }) {
    const res = await registerUser(email, password, username);

    if (!res) {
      Toast.show({
        type: "success",
        text1: "😃 Bienvenido",
      });

      setTimeout(() => {
        navigation.popToTop();
      }, 700);
    } else {
      switch (res) {
        case "auth/email-already-in-use":
          Toast.show({
            type: "error",
            text1: "⚠️ Ya existe una cuenta con ese email",
          });
          break;
        case "auth/invalid-email":
          Toast.show({
            type: "error",
            text1: "⚠️ Email inválido",
          });
          break;
        case "auth/weak-password":
          Toast.show({
            type: "error",
            text1: "⚠️ La contraseña es demasiado débil",
          });
          break;
        default:
          Toast.show({
            type: "error",
            text1: "⚠️ Algo ha salido mal. Por favor inténtelo nuevamente",
          });
          break;
      }
    }
  }

  return (
    <ScrollView className= {`bg-[${colors.primaryColor}] flex pt-6 h-full`}>
      <View className="z-10">
        <Toast config={toastConfig} />
      </View>

      <KeyboardAvoidingView
       behavior='position'
       keyboardVerticalOffset={-160}
      className="flex justify-center items-center w-[280] h-full mx-auto"      
      >
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={registerSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View className="w-screen flex h-auto items-center">


              <View className=" shadow-md bg-white items-center w-11/12 h-auto rounded-xl p-4">


                <Text className="text-black font-bold text-center text-2xl mb-5 mt-3">
                  Registrarse
                </Text>

                <Text
                  className="mr-auto text-base font-semibold  text-black "
                >
                  Nombre
                </Text>
                <TextInput
                  className="border py-3 px-4 focus:border-indigo-600/50 w-full rounded-md mb-2 border-black/20 text-black"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.name}
                  placeholder="John doe"
                  placeholderTextColor="#ffffff6a"
                />

                {errors.username && touched.username && (
                  <Text className="text-rose-500">{errors.username}</Text>
                )}

                <Text
                  className="mr-auto text-base font-semibold  text-black mt-1 "
                >
                  Email
                </Text>
                <TextInput
                  className="border py-3 px-4 focus:border-indigo-600/50 w-full rounded-md mb-2 border-black/20 text-black"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder="Your@email.com"
                  placeholderTextColor="#ffffff6a"
                />

                {errors.email && touched.email && (
                  <Text className="text-rose-500">{errors.email}</Text>
                )}

                <Text
                  className="mr-auto text-base mt-1 font-semibold  text-black"
                >
                  Password
                </Text>
                <View className="w-full flex flex-row  content-center items-center">

                <TextInput
                  className="border p-2 h-14 focus:border-indigo-600/50 w-11/12 rounded-md  border-black/20 text-black"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Aa"
                  placeholderTextColor="#ffffff6a"
                  secureTextEntry={passwordVisibility}

                />
              <Pressable
              className="ml-2"
              onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons
                name={rightIcon}
                size={22}
                color="#232323"
              />
            </Pressable>
                </View>

                {errors.password && touched.password && (
                  <Text className="text-rose-500 mb-2">{errors.password}</Text>
                )}

                <TouchableOpacity
                  style={{ backgroundColor: "#FFC107", width: "55%" }}
                  className="p-3 rounded-xl mb-6 mt-6 shadow-md"
                  onPress={() => handleSubmit()}
                >
                  <Text className="text-gray-800 font-bold text-center text-base">
                    Registrarse
                  </Text>
                </TouchableOpacity>
              </View>


              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="mt-4 mb-10 text-sm font-bold text-white/90 -tracking-wider">
                  ¿Tenes cuenta? Inicia sesión acá
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
