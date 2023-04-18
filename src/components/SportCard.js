import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Link, useTheme } from "@react-navigation/native";
import LogoTypeHome from "./LogoTypeHome";

export const SportCard = ({ title, icon }) => {
  const { dark, colors } = useTheme();

  return (
    <View>
      <LogoTypeHome data={title} />
      <Text
        style={{
          color: colors.accentColor,
          fontWeight: "bold",
          marginTop: 4,
          textAlign: "center",
        }}
      >
        {title.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,

    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
});
