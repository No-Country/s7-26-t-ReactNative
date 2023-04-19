import { Entypo } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";
import { Menu, Divider } from "react-native-paper";
import { deleteTeam } from "../firebase/deleteFunctions";
import { useNavigation } from "@react-navigation/native";

const MiniMenu = ({ teamId, tournamentId, createdBy, teamName, teamImage }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Entypo
          name="dots-three-vertical"
          size={16}
          color="black"
          onPress={openMenu}
        />
      }
      style={{ width: 100, height: 150}}
      contentStyle={{ backgroundColor: "#D1C4E9" }}
    >
      <Menu.Item
        titleStyle={{ color: "#000" }}
        onPress={() => {
          navigation.navigate({
            name: "EditTeam",
            params: { teamId, tournamentId, createdBy, teamName, teamImage },
          });
          closeMenu();
        }}
        title="Editar"
      />
      <Divider />
      <Menu.Item
        titleStyle={{ color: "#000" }}
        onPress={() => {
          deleteTeam(createdBy, tournamentId, teamId);
          closeMenu();
        }}
        title="Eliminar"
      />
    </Menu>
  );
};

export default MiniMenu;
