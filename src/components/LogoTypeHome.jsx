import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

export default function LogoTypeHome({ data }) {
  const { colors } = useTheme();

  switch (data) {
    case "Futbol":
      return (
        <FontAwesome
          name="soccer-ball-o"
          size={80}
          color={colors.dividerColor}
          style={{ marginBottom: 10 }}
        />
      );

    case "Basquet":
      return (
        <Ionicons
          name="basketball-outline"
          size={90}
          color={colors.dividerColor}
        />
      );

    case "Handball":
      return (
        <MaterialIcons
          name="sports-handball"
          size={80}
          color={colors.dividerColor}
        />
      );

    case "Tenis":
      return (
        <Ionicons
          name="tennisball-outline"
          size={80}
          color={colors.dividerColor}
        />
      );

    case "Voley":
      return (
        <FontAwesome5
          name="volleyball-ball"
          size={80}
          color={colors.dividerColor}
        />
      );

    case "E-Sport":
      return (
        <Ionicons
          name="game-controller-outline"
          size={80}
          color={colors.dividerColor}
        />
      );

    case "Hockey":
      return (
        <MaterialIcons
          name="sports-hockey"
          size={80}
          color={colors.dividerColor}
        />
      );

    case "Ciclismo":
      return <Ionicons name="bicycle" size={80} color={colors.dividerColor} />;

    case "Running":
      return (
        <FontAwesome5 name="running" size={80} color={colors.dividerColor} />
      );

    case "Natación":
      return (
        <FontAwesome5 name="swimmer" size={80} color={colors.dividerColor} />
      );

    // some other cases

    default:
      return (
        <AntDesign
          name="questioncircleo"
          size={80}
          color={colors.dividerColor}
        />
      );
  }
}
