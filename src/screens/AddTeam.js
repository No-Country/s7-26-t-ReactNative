import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { CreateTeam, CreateTournamentFB } from "../firebase/setFunctions";
import { useContext, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { toastConfig } from "../components/Toast";
import * as ImagePicker from "expo-image-picker";
import {UserContext} from '../context/UserContext'
import { uploadProfilePicture } from "../firebase/getFunctions";

const teamSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, "Ingresa almenos 3 caracteres")
    .required("El Nombre es obligatorio"),
});

const AddTeam = ({ navigation, route }) => {
  const {user, tournamentId} = useContext(UserContext)
  const [imagen, setImagen] = useState(null);

  const { colors } = useTheme();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };


  async function handleSubmit({ nombre, img }) {
    if (nombre) {

      const resImg = await uploadProfilePicture(
        imagen,
        `teamImg${nombre}`
      );

      const data = {
        nombre,
        imagen: resImg || img,

      };

      const resp = await CreateTeam( user.id,
      tournamentId, data);

      if (resp) {
        Toast.show({
          type: "success",
          text1: "😃 Creado con Exito",
        });

        setTimeout(() => {
          navigation.popToTop();
        }, 700);
      } else {
        Toast.show({
          type: "error",
          text1: "⚠️ Campos Incompletos.",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "⚠️ Campos Incompletos.",
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
        className="flex justify-center items-center w-[80%] my-5 h-full mx-auto"
        keyboardVerticalOffset={Platform.select({
          ios: () => 30,
          android: () => 30,
          web: () => 30,
        })()}
      >
        <Formik
          initialValues={{ nombre: "", img: "https://w7.pngwing.com/pngs/302/473/png-transparent-gray-and-black-shield-shield-drawing-logo-black-shield-angle-rectangle-photography.png" }}
          onSubmit={handleSubmit}
          validationSchema={teamSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View className="w-full flex gap-y-1">
                {
                  imagen?
                  <Image source={{ uri: imagen }} style={{height: 100, width: 100}} className="mx-auto mb-2" />
                  :
                  <View style={{marginBottom: 2}} className="mx-auto">
                    <FontAwesome name="file-picture-o" size={100} color="#fff" />
                  </View>
                }
              <Text
                className="mr-auto text-base font-semibold opacity-70 text-white"
              >
                Nombre
              </Text>
              <TextInput
                className="bg-white/10 border py-3 px-4 focus:border-indigo-600/50 w-full rounded-md mb-2 border-black/20 text-white"
                onChangeText={handleChange("nombre")}
                onBlur={handleBlur("nombre")}
                value={values.nombre}
                placeholder="Aa"
                placeholderTextColor={colors.grey}
              />

              {errors.nombre && touched.nombre && (
                <Text className="text-rose-600 mb-2">{errors.nombre}</Text>
              )}

              <Text
                className="mr-auto text-base font-semibold opacity-70 -mb-0.5 text-white"
              >
                Foto
              </Text>
              <View className="flex">
                <TouchableOpacity onPress={pickImage} style={{height: 44, marginBottom: 4}} className="border border-white/10 px-4 bg-white/10 rounded-md">
                  <Text className="text-center text-white text-base font-medium my-auto">Cargar Foto</Text>
                </TouchableOpacity>
              </View>


              <TouchableOpacity
                style={{backgroundColor: colors.accentColor}}
                className="p-3 rounded-md mb-3 text-white"
                onPress={() => handleSubmit()}
              >
                <Text className="text-white font-bold text-center text-base">
                  Agregar Equipo
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </>
  );
};

export default AddTeam;