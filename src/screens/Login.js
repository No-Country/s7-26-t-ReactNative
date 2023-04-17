import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { loginWithEmailPassword } from '../firebase/auth';
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { toastConfig } from '../components/Toast'
import { Torneopalooza } from '../components/icons';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email Invalido")
    .required("El Email es obligatorio"),
  password: Yup.string()
    .min(5, "Ingresa almenos 5 caracteres")
    .required("La Constraseña es obligatoria"),
});

export default function Login({ navigation }) {

  const { colors } = useTheme();

  async function handleSubmit({ email, password }) {
    const resp = await loginWithEmailPassword(email, password)

    if (resp) {
      Toast.show({
        type: "success",
        text1: "😃 Bienvenido"
      });

      setTimeout(() => {
        navigation.popToTop();
      }, 700);
    }
    else {
      Toast.show({
        type: "error",
        text1: "⚠️ Error en credenciales."
      });
    }
  }

  return (
    <View className="flex h-full">
      <View className="z-10">
        <Toast config={toastConfig} />
      </View>

      <KeyboardAvoidingView
        behavior="padding"
        className="flex justify-center items-center w-[280] h-full mx-auto"
        keyboardVerticalOffset={
          Platform.select({
            ios: () => 50,
            android: () => 50,
            web: () => 50
          })()
        }
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View className="w-screen flex h-auto items-center mb-40">

              <View className="mx-auto mb-20">
                <Torneopalooza width={200} height={75} color={colors.yellow} />
              </View>


              <View className=" shadow-md bg-white items-center w-11/12 h-auto rounded-xl p-4">

                <Text className="text-black font-bold text-center text-2xl mb-5 mt-3">
                  Iniciar sesión
                </Text>


                <Text
                  className="mr-auto  text-base font-semibold text-black mb-2"
                >
                  Email
                </Text>
                <TextInput
                  className="bg-white/10 border py-3 px-4 focus:border-indigo-600/50 w-full rounded-md mb-6 border-black/20 text-black shadow-md"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Your@email.com"
                  placeholderTextColor="#ffffff6a"
                />

                {errors.email && touched.email && <Text className="text-rose-500">{errors.email}</Text>}

                <Text
                  className="mr-auto text-base font-semibold text-black mb-2"
                >
                  Contraseña
                </Text>
                <TextInput
                  className="bg-white/10 border py-3 px-4 focus:border-indigo-600/50 w-full rounded-md mb-6 border-black/20 text-black shadow-md"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Aa"
                  placeholderTextColor="#ffffff6a"
                />

                {errors.password && touched.password && <Text className="text-rose-600 mb-2">{errors.password}</Text>}

                <TouchableOpacity
                  style={{ backgroundColor: "#FFC107", width: "55%" }}
                  className="p-3 rounded-xl mb-6 shadow-md"
                  onPress={() => handleSubmit()}
                >
                  <Text className="text-black font-bold text-center text-base">
                    Iniciar sesión
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text className="text-sm  font-bold mt-4 mb-4 text-white">
                  ¿No Tenes cuenta? Registrate acá
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </View>
  )
}