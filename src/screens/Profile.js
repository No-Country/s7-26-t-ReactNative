import { ScrollView, Text, View, Linking, TouchableOpacity, TextInput, KeyboardAvoidingView} from "react-native"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

const userSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Ingresa almenos 3 caracteres")
    .required("El usuario es obligatorio"),
  email: Yup.string()
    .email("Email Invalido")
    .required("El Email es obligatorio"),
  phone: Yup.number()
});

export default function Profile(){
  
  const {colors} = useTheme()
  const {user, setUser} = useContext(UserContext);
  const [editMode, setEditMode] = useState(false)

  async function handleSubmit({ email, username, phone }) {
    //const res = await updateProfile(email, username, phone);

    console.log(email);
    console.log(username);
    console.log(phone);

    if (!res) {
      Toast.show({
        type: "success",
        text1: "😃 Cambios Guardados",
      });

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Index" }],
        });
      }, 1000);
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
    <KeyboardAvoidingView
    behavior="position"
    keyboardVerticalOffset={Platform.select({
      ios: () => -160,
      android: () => -160,
      web: () => -160
    })()}
    >
    <ScrollView className="h-full">
      <Formik
        initialValues={{ username: user.username, email: user.email, phone: user.telefono }}
        onSubmit={handleSubmit}
        validationSchema={userSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
        <View className="gap-y-8 py-8">
          <View className="flex items-center relative">
            <TouchableOpacity className="ml-auto absolute right-5 top-0 w-[34] items-center" onPress={() => setEditMode(!editMode)}>
              {
                editMode?
                <FontAwesome name="close" size={32} color="#fff" />
                :
                <FontAwesome name="edit" size={32} color="#fff" />
              }
            </TouchableOpacity>
            {
              editMode?
              <View className="flex items-center">
                <FontAwesome name="user-circle" size={60} color="#fff" />
                <TouchableOpacity style={{backgroundColor: colors.yellow}} className="mt-2 py-1.5 px-3 rounded">
                  <Text className="text-white font-semibold">Cargar Imagen</Text>
                </TouchableOpacity>
              </View>
              :
              <FontAwesome name="user-circle" size={60} color="#fff" />
            }
            {
              editMode?
              <>
              <TextInput
                style={{minWidth: 160, maxWidth: 320}}
                className="text-4xl text-white font-semibold my-3 bg-black/20 px-2 pt-1.5"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                placeholderTextColor="#ffffff6a"
              />

              {errors.username && touched.username && (
                <Text className="text-rose-500 text-xs mb-2">{errors.username}</Text>
              )}
              </>
              :
              <Text className="text-4xl text-white font-semibold mt-3">{user.username}</Text>
            }
          </View>
  
          <View className="flex flex-row justify-around py-4 w-[90%] mx-auto bg-black/10 rounded-lg">
            <View className="flex items-center">
              <Text className="text-2xl font-bold text-white">28</Text>
              <Text className="text-base font-medium text-white">Equipos</Text>
            </View>
            
            <View className="flex items-center">
              <Text className="text-2xl font-bold text-white">2</Text>
              <Text className="text-base font-medium text-white">Torneos</Text>
            </View>
  
            <View className="flex items-center">
              <Text className="text-2xl font-bold text-white">4</Text>
              <Text className="text-base font-medium text-white">Deportes</Text>
            </View>
  
          </View>
  
          <View className="px-[7.5%]">
            <Text className="text-3xl text-white font-semibold mb-3">Contacto</Text>
  
            <View className="flex flex-row items-center gap-x-2 mb-2 bg-white/5 py-3 px-2 rounded-lg">
              <View className="w-[24] items-center -mb-0.5">
                <FontAwesome name="phone" size={24} color="#fff" />
              </View>
  
              {
                editMode?
                <View>
                <TextInput
                  style={{minWidth: 160, maxWidth: 280}}
                  className="text-white font-semibold bg-black/20 px-2 py-1.5 items-center ml-2"
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.telefono}
                  placeholderTextColor="#ffffff6a"
                />
                </View>
                :
                <Text className="text-lg text-white font-semibold" onPress={() => {user?.telefono? Linking.openURL(`https://wa.me/+549${user?.telefono}`) : null}}>
                {user.telefono? user.telefono : "Sin Telefono"}
                </Text>
              }
            </View>
  
            <View className="flex flex-row items-center gap-x-2 bg-white/5 py-3 px-2 rounded-lg">
              <View className="w-[24] justify-center items-center">
                <MaterialIcons name="alternate-email" size={24} color="#fff" />
              </View>
  
              {
                editMode?
                <View>
                <TextInput
                  style={{minWidth: 160, maxWidth: 280}}
                  className="text-white font-semibold bg-black/20 px-2 py-1.5 items-center ml-2"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholderTextColor="#ffffff6a"
                />

                {errors.email && touched.email && (
                  <Text className="text-rose-500 text-xs ml-2 mt-1">{errors.email}</Text>
                )}
                </View>
                :
                <Text className="text-lg text-white font-semibold" onPress={() => {user?.email? Linking.openURL(`mailto:${user?.email}`) : null}}>
                  {user.email? user.email : "-"}
                </Text>
              }
            </View>
          </View>
          {
            editMode?
            <TouchableOpacity style={{backgroundColor: colors.yellow}} className="mx-auto py-2 px-3.5 rounded" onPress={() => handleSubmit()}>
              <Text className="text-white text-base font-semibold">Guardar Cambios</Text>
            </TouchableOpacity>
            :
            null
          }
        </View>
        )}
      </Formik>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}
