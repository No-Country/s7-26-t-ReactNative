import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

export default function LogoTypeHome({data}) {
const {colors}= useTheme()

  switch (data) {
    case "Futbol":
      return <FontAwesome name="soccer-ball-o" size={80} color={colors.grey} />;

    case "Basquet":
      return <Ionicons name="basketball-outline" size={90} color={colors.grey} />;

    case "Handball":
      return <MaterialIcons name="sports-handball" size={80} color={colors.grey} />;

    case "Tenis":
      return <Ionicons name="tennisball-outline" size={80} color={colors.grey} />;

    case "Voley":
      return <FontAwesome5 name="volleyball-ball" size={80} color={colors.grey} />;

    case "E-Sport":
      return (
        <Ionicons name="game-controller-outline" size={80} color={colors.grey} />
      );

    case "Hockey":
      return <MaterialIcons name="sports-hockey" size={80} color={colors.grey} />;

    case "Ciclismo":
      return <Ionicons name="bicycle" size={80} color={colors.grey} />;

    case "Running":
      return <FontAwesome5 name="running" size={80} color={colors.grey} />;

    case "Natación":
      return <FontAwesome5 name="swimmer" size={80} color={colors.grey} />;

    // some other cases

    default:
      return <AntDesign name="questioncircleo" size={80} color={colors.grey} />;
  }
}
