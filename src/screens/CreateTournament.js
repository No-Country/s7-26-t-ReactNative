import { Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Platform} from "react-native"
import { Formik } from "formik";
import * as Yup from "yup";
import { CreateTournamentFB } from "../firebase/getFunctions";
import { useState } from "react";
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { toastConfig } from "../components/Toast";

const tournamentSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, "Ingresa almenos 3 caracteres")
    .required("El Nombre es obligatorio"),
  region: Yup.string()
    .required("La Region es obligatoria"),
  ciudad: Yup.string()
    .required("La Ciudad es obligatoria"),
  descripcion: Yup.string()
    .min(5, "Ingresa almenos 5 caracteres")
    .required("La Descripción es obligatoria"),
});

const CreateTournament = ({navigation, route}) => {
  
  const [imagen, setImagen] = useState(null)
  const [deporte, setDeporte] = useState(null)
  const deportes = ["Futbol", "Basquet", "Handball", "Tenis"]
  const { colors } = useTheme()

  async function handleSubmit({nombre, region, ciudad, descripcion}){

    if (deporte) {
      const data = {
        nombre,
        creador: route.params.username,
        region,
        ciudad,
        deporte,
        imagen,
        descripcion
      }

      const resp = await CreateTournamentFB(data)

      if (resp) {
        Toast.show({
          type: "success",
          text1: "😃 Creado con Exito"
        });

        setTimeout(() => {
          navigation.popToTop();
        }, 700); 
      }
      else
      {
        Toast.show({
          type: "error",
          text1: "⚠️ Campos incompletos."
        });
      }       
    }
    else
    {
      Toast.show({
        type: "error",
        text1: "⚠️ Selecciona un deporte."
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
          web: () => 30
        })()}
      >
        
      <Formik
        initialValues={{ nombre: "", region: "", ciudad: "", descripcion: ""}}
        onSubmit={handleSubmit}
        validationSchema={tournamentSchema}
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
            <Text
              style={{ color: colors.text }}
              className="mr-auto text-base font-semibold opacity-50"
            >
              Nombre
            </Text>
            <TextInput
              className="bg-white/10 border border-black/20 py-3 px-4 focus:border-indigo-600/50 w-full rounded-md mb-2"
              style={{ color: colors.text }}
              onChangeText={handleChange("nombre")}
              onBlur={handleBlur("nombre")}
              value={values.nombre}
              placeholder="Aa"
              placeholderTextColor={colors.text}
            />

            {errors.nombre && touched.nombre && (
              <Text className="text-rose-600 mb-2">{errors.nombre}</Text>
            )}

            <Text
              style={{ color: colors.text }}
              className="mr-auto text-base font-semibold opacity-50"
            >
              Region
            </Text>
            <TextInput
              className="bg-white/10 border border-black/20 py-3 px-4 focus:border-indigo-600/50 w-full rounded-md mb-2"
              style={{ color: colors.text }}
              onChangeText={handleChange("region")}
              onBlur={handleBlur("region")}
              value={values.region}
              placeholder="Aa"
              placeholderTextColor={colors.text}
            />

            {errors.region && touched.region && (
              <Text className="text-rose-600 mb-2">{errors.region}</Text>
            )}

            <Text
              style={{ color: colors.text }}
              className="mr-auto text-base font-semibold opacity-50"
            >
              Ciudad
            </Text>
            <TextInput
              className="bg-white/10 border border-black/20 py-3 px-4 focus:border-indigo-600/50 w-full rounded-md mb-2"
              style={{ color: colors.text }}
              onChangeText={handleChange("ciudad")}
              onBlur={handleBlur("ciudad")}
              value={values.ciudad}
              placeholder="Aa"
              placeholderTextColor={colors.text}
            />

            {errors.ciudad && touched.ciudad && (
              <Text className="text-rose-600 mb-2">{errors.ciudad}</Text>
            )}

            <SelectDropdown
              defaultButtonText="Elegir Deporte"
              data={deportes}
              buttonStyle={{width: "100%", backgroundColor: colors.card, borderColor: colors.text, borderWidth: .3, borderRadius: 5}}
              buttonTextStyle={{color: colors.text}}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              rowStyle={{width: "100%", backgroundColor: colors.card, borderBottomColor: "transparent"}}
              rowTextStyle={{color: colors.text}}
              onSelect={(selectedItem) => {
                setDeporte(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem
              }}
              rowTextForSelection={(item) => {
                return item
              }}
            />

            <Text
              style={{ color: colors.text }}
              className="mr-auto text-base font-semibold opacity-50"
            >
              Descripción
            </Text>
            <TextInput
              className="bg-white/10 border border-black/20 py-3 px-4 focus:border-indigo-600/50 w-full rounded-md mb-2"
              style={{ color: colors.text }}
              onChangeText={handleChange("descripcion")}
              onBlur={handleBlur("descripcion")}
              value={values.descripcion}
              placeholder="Aa"
              placeholderTextColor={colors.text}
            />

            {errors.descripcion && touched.descripcion && (
              <Text className="text-rose-600 mb-2">{errors.descripcion}</Text>
            )}

            <TouchableOpacity
              className="bg-indigo-600 p-3 rounded-md mb-3"
              onPress={() => handleSubmit()}
            >
              <Text className="text-white font-bold text-center text-base">
                Crear Torneo
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      </KeyboardAvoidingView>

    </>
  )
}

export default CreateTournament
