import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { useTheme } from "@react-navigation/native";
import MiniMenu from "./MiniMenu";
import { UserContext } from "../context/UserContext";
import TextTicker from 'react-native-text-ticker'

export default function TeamCard({ team, tournamentId, createdBy }) {
  /* const { user, tournamentId, createdBy } = useContext(UserContext); */
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      className={"flex p-2 px-3 m-2 rounded-lg w-36 h-30"}
      style={{ backgroundColor: colors.lightPrimary }}
    >
      <TouchableOpacity
        className="self-end z-10 w-5 h-5"
        onPress={() => console.log("Presss + " + team.nombre)}
      >
        <MiniMenu
          teamId={team.id}
          createdBy={createdBy}
          tournamentId={tournamentId}
          teamName={team.nombre}
          teamImage={team.imagen}
        />
      </TouchableOpacity>
      <View className="flex felx-col items-center space-y-4">
        {team.imagen ? (
          <Image
            source={{ uri: team.imagen }}
            className="h-16 w-16 rounded-full "
          />
        ) : (
          <Image
            source={require("../../assets/defaultGroup.png")}
            className="h-16 w-16 rounded-full "
          />
        )}
        <TextTicker
          className=" text-md my-1" style={{ color: colors.primaryText }}
          duration={3500}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={1000}
        >
          {team.nombre}
        </TextTicker>
      </View>
    </TouchableOpacity>
  );
}
