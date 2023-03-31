import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { CreateTournamentFB } from "../firebase/getFunctions";
import { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { toastConfig } from "../components/Toast";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const tournamentSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, "Ingresa almenos 3 caracteres")
    .required("El Nombre es obligatorio"),
  descripcion: Yup.string()
    .min(5, "Ingresa almenos 5 caracteres")
    .required("La Descripción es obligatoria"),
});

const CreateTournament = ({ navigation, route }) => {
  const [imagen, setImagen] = useState(null);
  const [deporte, setDeporte] = useState(null);
  const [location, setLocation] = useState(null);
  const deportes = [
    "Futbol",
    "Basquet",
    "Handball",
    "Tenis",
    "Voley",
    "E-Sport",
    "Rugby",
    "Baseball",
    "Hockey",
    "Golf",
    "Ciclismo",
    "Running",
    "Natación",
    "Otro",
  ];
  const { dark, colors } = useTheme();

  const handleSelectPlace = (place) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${Constants.expoConfig.extra.geoKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(JSON.stringify(data.result));
        setLocation({
          latitud: data.result.geometry.location.lat,
          longitud: data.result.geometry.location.lng,
          direccion: data.result.formatted_address,
        });
      })
      .catch((error) => console.error(error));
  };

  async function handleSubmit({ nombre, descripcion }) {
    if (deporte && location) {
      const data = {
        nombre,
        creador: route.params.username,
        direccion: location.direccion,
        latitud: location.latitud,
        longitud: location.longitud,
        deporte,
        imagen,
        descripcion,
      };

      const resp = await CreateTournamentFB(data);

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
          initialValues={{ nombre: "", descripcion: "" }}
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
                className={
                  "bg-white/10 border py-3 px-4 focus:border-indigo-600/50 w-full rounded-md mb-2 " +
                  (dark ? "border-white/10" : "border-black/20")
                }
                style={{ color: colors.text }}
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
                style={{ color: colors.text }}
                className="mr-auto text-base font-semibold opacity-50 mb-1"
              >
                Deporte
              </Text>

              <SelectDropdown
                defaultButtonText="Elegir Deporte"
                data={deportes}
                buttonStyle={{
                  width: "100%",
                  backgroundColor: dark ? "#ffffff1a" : "transparent",
                  borderColor: dark ? "#ffffff1a" : "#00000033",
                  height: 44,
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                buttonTextStyle={{ color: colors.text }}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={"#444"}
                      size={18}
                    />
                  );
                }}
                rowStyle={{
                  width: "100%",
                  backgroundColor: colors.card,
                  borderBottomColor: "transparent",
                }}
                rowTextStyle={{ color: colors.text }}
                onSelect={(selectedItem) => {
                  setDeporte(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item) => {
                  return item;
                }}
              />

              <Text
                style={{ color: colors.text }}
                className="mr-auto text-base font-semibold opacity-50 -mb-0.5"
              >
                Ciudad
              </Text>

              <View className="z-10">
                <GooglePlacesAutocomplete
                  placeholder="Buscar Ciudad"
                  onPress={(data, details = null) => handleSelectPlace(details)}
                  styles={{
                    container: {
                      flex: 0,
                      backgroundColor: "transparent",
                    },
                    textInput: {
                      borderWidth: 1,
                      borderColor: dark ? "#ffffff1a" : "#00000033",
                      backgroundColor: dark ? "#ffffff1a" : "transparent",
                      color: colors.text,
                    },
                  }}
                  onFail={(error) => console.error(error)}
                  query={{
                    key: Constants.expoConfig.extra.geoKey,
                    language: "es",
                  }}
                  textInputProps={{
                    placeholderTextColor: colors.grey,
                    returnKeyType: "search",
                  }}
                />
              </View>

              <Text
                style={{ color: colors.text }}
                className="mr-auto text-base font-semibold opacity-50"
              >
                Descripción
              </Text>
              <TextInput
                className={
                  "bg-white/10 border py-3 px-4 focus:border-indigo-600/50 w-full rounded-md mb-2 " +
                  (dark ? "border-white/10" : "border-black/20")
                }
                style={{ color: colors.text }}
                onChangeText={handleChange("descripcion")}
                onBlur={handleBlur("descripcion")}
                value={values.descripcion}
                placeholder="Aa"
                placeholderTextColor={colors.grey}
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
  );
};

export default CreateTournament;
