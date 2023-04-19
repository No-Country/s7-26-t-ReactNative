import { ScrollView, Text, View, Linking, TouchableOpacity, TextInput, Image ,KeyboardAvoidingView, ImageBackground} from "react-native"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "../firebase/auth";
import { uploadProfilePicture } from "../firebase/getFunctions";
import Toast from "react-native-toast-message";
import { toastConfig } from "../components/Toast";

const userSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Ingresa almenos 3 caracteres")
    .required("El usuario es obligatorio"),
  email: Yup.string()
    .email("Email Invalido")
    .required("El Email es obligatorio"),
  telefono: Yup.string(),
  twitter: Yup.string()
});

export default function Profile({navigation}){
  
  const {colors} = useTheme()
  const {user, setUser} = useContext(UserContext);
  const [editMode, setEditMode] = useState(false)
  const [image, setImage] = useState(null)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  async function handleSubmit(data) {
    const {
      email,
      username,
      telefono,
      twitter
    } = data;

    let photo = ""
    
    image?
      photo = await uploadProfilePicture(
        image,
        `profilePicImg${username}`
      )
      :
      null

    const userId = user.id;
    const updatedEmail = email !== user.email ? email : user.email;
    const updatedUsername = username !== user.username ? username : user.username;
    const updatedTelefono = telefono !== user.telefono ? telefono : user.telefono;
    const updatedPhoto = photo ? photo : user.photo;
    const updatedTwitter = twitter !== user.twitter ? twitter : user.twitter;

    const res = await updateProfile(userId, updatedEmail, updatedUsername, updatedTelefono, updatedPhoto ,updatedTwitter)

    if (res) {
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
      Toast.show({
        type: "error",
        text1: "⚠️ Algo ha salido mal. Por favor inténtelo nuevamente",
      });
    }

    setUser({
      ...user,
      email: updatedEmail,
      username: updatedUsername,
      telefono: updatedTelefono,
      photo: updatedPhoto,
      twitter: updatedTwitter,
    });
  }

  return (
    <>
    <View className="z-10">
    <Toast config={toastConfig} />
    </View>
    <KeyboardAvoidingView
    behavior="position"
    keyboardVerticalOffset={Platform.select({
      ios: () => -120,
      android: () => -120,
      web: () => -120
    })()}
    >
    <ScrollView className="h-full bg-[#673AB7]">
      <Formik
        initialValues={{ username: user.username, email: user.email, telefono: user.telefono, twitter: user?.twitter }}
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
          resetForm
        }) => (
        <ImageBackground
          style={{
            height: "100%",
            width: "100%"
          }}
          resizeMode="cover"
          source={require("../../assets/bg_pattern.png")}
        >
        <View className="gap-y-6 py-8">
          <View className="flex items-center relative">
            <TouchableOpacity className="ml-auto absolute right-5 top-0 w-[34] items-center" onPress={() => {setEditMode(!editMode), editMode && resetForm() }}>
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
                {
                  image?
                  <Image
                    resizeMode="contain"
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 100
                    }}
                    source={{
                      uri: image
                    }}
                  />
                  :
                  <FontAwesome name="user-circle" size={60} color="#fff" />
                }
                <TouchableOpacity onPress={pickImage} style={{backgroundColor: colors.yellow}} className="mt-2 py-1.5 px-3 rounded">
                  <Text className="text-white font-semibold">Cargar Imagen</Text>
                </TouchableOpacity>
              </View>
              :
              <>
              {
                user?.photo?
                <Image
                  resizeMode="contain"
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 100
                  }}
                  source={{
                    uri: user?.photo
                  }}
                />
                :
                <FontAwesome name="user-circle" size={60} color="#fff" />
              }
              </>
            }
            {
              editMode?
              <>
              <TextInput
                style={{minWidth: 160, maxWidth: 320}}
                className="text-4xl text-white font-semibold my-3 bg-black/20 px-2 pt-1.5 rounded-lg"
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

          <View className="px-[7.5%]">
            <Text className="text-3xl text-white font-bold mb-4 tracking-widest">Social</Text>
  
            <View className="flex flex-row items-center gap-x-2 mb-2 bg-white/5 py-3 px-2 rounded-lg">
              <View className="w-[24] items-center -mb-0.5">
                <FontAwesome name="phone" size={24} color="#fff" />
              </View>
  
              {
                editMode?
                <View>
                <TextInput
                  style={{minWidth: 160, maxWidth: 280}}
                  keyboardType='numeric'
                  className="text-white font-semibold bg-black/20 px-2 py-1.5 items-center ml-2 rounded"
                  onChangeText={handleChange("telefono")}
                  onBlur={handleBlur("telefono")}
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
  
            <View className="flex flex-row items-center gap-x-2 bg-white/5 py-3 px-2 rounded-lg mb-2">
              <View className="w-[24] justify-center items-center">
                <MaterialIcons name="alternate-email" size={24} color="#fff" />
              </View>
  
              {
                editMode?
                <View>
                <TextInput
                  style={{minWidth: 160, maxWidth: 280}}
                  className="text-white font-semibold bg-black/20 px-2 py-1.5 items-center ml-2 rounded"
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

            <View className="flex flex-row items-center gap-x-2 bg-white/5 py-3 px-2 rounded-lg">
              <View className="w-[24] justify-center items-center">
                <FontAwesome name="twitter" size={24} color="#fff" />
              </View>
  
              {
                editMode?
                <View className="pl-2">
                  <View style={{minWidth: 160, maxWidth: 280}}  className="flex flex-row items-center bg-black/20 pl-2 rounded">
                    <View className="w-[20] justify-center items-center">
                      <MaterialIcons name="alternate-email" size={20} color="#FFFFFFB3" />
                    </View>
                    <TextInput
                      className="text-white font-semibold px-0.5 py-1.5 w-[130]"
                      onChangeText={handleChange("twitter")}
                      onBlur={handleBlur("twitter")}
                      value={values.twitter}
                      placeholderTextColor="#ffffff6a"
                    />
                  </View>
                </View>
                :
                <Text className="text-lg text-white font-semibold" onPress={() => {user?.twitter? Linking.openURL(`https://twitter.com/${user?.twitter}`) : null}}>
                  {user.twitter? user.twitter : "-"}
                </Text>
              }
            </View>

          </View>
          {
            editMode?
            <TouchableOpacity style={{backgroundColor: colors.yellow}} className="mx-auto py-2 px-3.5 rounded" onPress={handleSubmit}>
              <Text className="text-white text-base font-semibold">Guardar Cambios</Text>
            </TouchableOpacity>
            :
            null
          }
        </View>
        </ImageBackground>
        )}
      </Formik>
    </ScrollView>
    </KeyboardAvoidingView>
    </>
  )
}
