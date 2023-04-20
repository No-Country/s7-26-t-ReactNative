import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { getSaved } from "../firebase/getFunctions";
import { deleteSaved } from "../firebase/deleteFunctions";
import { setSaved } from "../firebase/setFunctions";
import { UserContext } from "../context/UserContext";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db, mainCollection } from "../firebase/credentials";

export default function TournamentDetails({ item }) {
  const { user, tournamentId} = useContext(UserContext)
  const { colors } = useTheme();
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    const save = async () => {
      await getDoc(doc(db, mainCollection, user?.id, "Saved", item.id)).then(
        (docsnapshot) => {
          if (docsnapshot.exists()) {
            setFollow(true);
          } else {
            setFollow(false);
          }
        }
      );
    };
    save();
  }, [follow]);

  const handleSaved = () => {
    getDoc(doc(db, mainCollection, user?.id, "Saved", item.id)).then(
      (docsnapshot) => {
        if (docsnapshot.exists()) {
          deleteDoc(doc(db, mainCollection, user?.id, "Saved", item.id));
          setFollow(false);
        } else {
          setDoc(doc(db, mainCollection, user?.id, "Saved", item.id), item);
          setFollow(true);
        }
      }
    );
    return follow;
  };

  return (
    <View className="flex justify-center items-center w-full p-4 text-center bg-white rounded-xl">
      {item.imagen ? (
        <Image
          className="w-20 h-20 rounded-full "
          source={{
            uri: `${item.imagen}`,
          }}
        />
      ) : (
        <Image
          className="w-20 h-20 rounded-full "
          source={require("../../assets/torneoSample.png")}
        />
      )}

      <View className="flex flex-row justify-center items-center">
        <Text
          style={{ color: colors.primaryText }}
          className="text-2xl font-bold my-2 "
        >
          {item.nombre}
          {"  "}
        </Text>
        <Text className="text-xs italic bg-indigo-600 text-white px-2 py-1 rounded-md">
          {item.deporte}
        </Text>
      </View>
      <Text style={{ color: colors.text }} className="text-base ">
        {item.descripcion}
      </Text>
      <TouchableOpacity
        className={"flex flex-row items-center gap-x-4 my-4 px-4 py-2 rounded-md "}
        style={{ backgroundColor: colors.accentColor }}
        onPress={handleSaved}
      >
        <Text className="font-semibold">Seguir</Text>
        {follow ? (
          <FontAwesome name="star" size={20} color="black" />
        ) : (
          <FontAwesome name="star-o" size={20} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
}
