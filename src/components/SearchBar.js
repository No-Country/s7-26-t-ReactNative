import React, { useEffect, useState } from "react";
import { Searchbar, useTheme } from "react-native-paper";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Modal } from "react-native";
import CategoryPicker from "./CategoryPicker";
import Slider from "react-native-a11y-slider";
import {
  getNearTournaments,
  searchTournaments,
  ListSpecificTournaments,
} from "../firebase/getFunctions";
import * as Location from "expo-location";
import { RootColors } from "../theme.js";

export const SearchBar = ({ setPartidos }) => {
  /* const { dark, colors } = useTheme(); */
  const { colors } = RootColors;
  const [distancia, setDistancia] = useState(0);
  const [apply, setApply] = useState([]);
  const [modalVisible, setModalVisible] = useState([]);
  const [selected, setSelected] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {
    let data = await searchTournaments(searchText);
    setPartidos(data);
  };

  //Esta funcion solo se asegura de tener permiso del usuario de usar su ubicación
  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permiso Rechazado");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    return {
      latitud: location.coords.latitude,
      longitud: location.coords.longitude,
    };
  }

  const handleApply = async () => {
    setModalVisible(!modalVisible);
    setAccepted(true);

    if (distancia > 0) {
      console.log("Filtro por Distancia");
      let data = await getCurrentLocation();

      if (data) {
        let res = await getNearTournaments(
          data.latitud,
          data.longitud,
          distancia
        );

        setPartidos(res);

        let sportsSelected = selected.map((obj) => obj.deporte);

        if (sportsSelected.length) {
          console.log("Aplicando Filtro Deportes con Distancia");
          const validSports = new Set(sportsSelected);
          let found = res.filter((e) => validSports.has(e.deporte));
          setPartidos(found);
        }
      } else {
        console.log("No encontre torneos cerca");
      }
    } else if (selected.length) {
      console.log("Filtro de Deportes SIN distancia");

      let sportsSelected = selected.map((obj) => obj.deporte);
      if (sportsSelected) {
        let resp = await ListSpecificTournaments(sportsSelected);
        setPartidos(resp);
      }
    } else {
      //si no se selecciona nada traigo toda la lista al apretar aplicar
      handleSearch();
    }
  };

  const filterSelected = () => {
    setModalVisible(true);
  };

  return (
    <View className="rounded-lg overflow-hidden mt-4 flex w-full flex-row justify-around content-center items-center ">
      <Searchbar
        className="rounded-lg"
        placeholder={"Buscar"}
        placeholderTextColor={colors.primaryText}
        onChangeText={setSearchText}
        onIconPress={handleSearch}
        onSubmitEditing={handleSearch}
        inputStyle={styles.input}
        style={styles.search}
        icon={() => <FontAwesome name="search" size={18} color={"grey"} />}
      />
      <TouchableOpacity
        className="p-2 w-24 ml-4 h-10 rounded-lg"
        onPress={filterSelected}
        style={{ backgroundColor: colors.accentColor }}
      >
        <Text
          style={{ color: colors.primaryText }}
          className="text-base text-center font-bold "
        >
          {" "}
          Filtros ▼{" "}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className=" flex-1 justify-center items-end ">
          <View className="w-10/12 h-2.5/5  mx-auto bg-white px-4 pb-8 pt-4 flex shadow-md z-5 border-2 rounded-xl border-violet-400">
            <View>
              <Text className="text-base font-bold mb-2 mt-2">DEPORTES</Text>
              <View>
                <CategoryPicker
                  apply={apply}
                  setApply={setApply}
                  selected={selected}
                  setSelected={setSelected}
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-base font-bold mb-2 mt-2">
                DISTANCIA {distancia} KMS
              </Text>
              <Slider
                increment={5}
                onChange={(e) => setDistancia(e)}
                showLabel={false}
                min={0}
                max={1000}
                values={[0]}
                markerColor={"#673AB7"}
              />
            </View>

            <View className="w-max flex-row flex justify-around bg-red">
              <Pressable
                className="p-2 bg-indigo-400 w-[43%] h-10 rounded-md"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className="text-base text-center font-bold text-white">
                  CANCELAR
                </Text>
              </Pressable>

              <Pressable
                className="p-2 bg-indigo-800 w-[43%]  h-10 rounded-md"
                onPress={handleApply}
              >
                <Text className="text-base text-center font-bold text-white">
                  APLICAR
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    width: "70%",
    border: "none",
    height: 40,
    elevation: 0,
    borderRadius: 2,
    borderTopWidth: 0, //works
    borderBottomWidth: 0, //works
  },
  input: {
    marginTop: -6,
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
