import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity} from 'react-native';
import { loginWithEmailPassword } from '../firebase/getFunctions';
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import {toastConfig} from '../components/Toast'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email Invalido")
    .required("El Email es obligatorio"),
  password: Yup.string()
    .min(5, "Ingresa almenos 5 caracteres")
    .required("La Constraseña es obligatoria"),
});

export default function Login({navigation}) {
  
  const { colors } = useTheme();

  async function handleSubmit({email, password}){
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
    else
    {
      Toast.show({
        type: "error",
        text1: "⚠️ Error en credenciales."
      });
    }
  }

  return (
    <>
    <View className="z-10">
    <Toast config={toastConfig} />
    </View>
    
    <KeyboardAvoidingView
      behavior="padding"
      className="flex justify-center items-center w-[280] h-full mx-auto"
      keyboardVerticalOffset={
        Platform.select({
           ios: () => 50,
           android: () => 50
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
          <View className="w-full flex">
            <Text
              style={{ color: colors.text }}
              className="mx-auto text-center text-4xl mb-5 font-bold -tracking-wide"
            >
              Bienvenido a Torneopalooza
            </Text>

            <Text
              style={{ color: colors.text }}
              className="mr-auto text-base font-semibold opacity-50"
            >
              Email
            </Text>
            <TextInput
              className="bg-white/10 border border-black/20 py-3 px-4 focus:border-indigo-600/50 w-full rounded-md mb-2"
              style={{ color: colors.text }}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Your@email.com"
              placeholderTextColor={colors.text}
            />
            
            {errors.email && touched.email && <Text className="text-rose-600">{errors.email}</Text>}

            <Text
              style={{ color: colors.text }}
              className="mr-auto text-base font-semibold opacity-50"
            >
              Password
            </Text>
            <TextInput
              className="bg-white/10 border border-black/20 py-3 px-4 focus:border-indigo-600/50 w-full rounded-md mb-2"
              style={{ color: colors.text }}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Aa"
              placeholderTextColor={colors.text}
            />
            
            {errors.password && touched.password && <Text className="text-rose-600 mb-2">{errors.password}</Text>}

            <TouchableOpacity
              className="bg-indigo-600 p-3 rounded-md mb-3"
              onPress={() => handleSubmit()}
            >
              <Text className="text-white font-bold text-center text-base">
                Iniciar Sesion
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
            <Text className="text-sm font-bold text-indigo-500 -tracking-wider">
              ¿No Tenes cuenta? Registrate acá
            </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
    </>
  )
}