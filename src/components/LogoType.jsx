import { FontAwesome, FontAwesome5, MaterialIcons, AntDesign} from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
export default function LogoType({ data }) {
  switch (data.deporte) {
    case "Futbol":
      return <FontAwesome name="soccer-ball-o" size={24} color="black" />;

    case "Basquet":
      return <Ionicons name="basketball-outline" size={28} color="black" />;

    case "Handball":
      return <MaterialIcons name="sports-handball" size={24} color="black" />;

    case "Tenis":
      return <Ionicons name="tennisball-outline" size={24} color="black" />;

    case "Voley":
      return <FontAwesome5 name="volleyball-ball" size={24} color="black" />;

    case "E-Sport":
      return (
        <Ionicons name="game-controller-outline" size={24} color="black" />
      );

    case "Hockey":
      return <MaterialIcons name="sports-hockey" size={24} color="black" />;

    case "Ciclismo":
      return <Ionicons name="bicycle" size={24} color="black" />;

    case "Running":
      return <FontAwesome5 name="running" size={24} color="black" />;

    case "Natación":
      return <FontAwesome5 name="swimmer" size={24} color="black" />;

    // some other cases

    default:
      return <AntDesign name="questioncircleo" size={24} color="black" />;
  }
}