import { View } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { useTheme } from "@react-navigation/native";

export default function Loader() {
  const { dark, colors } = useTheme();
  return (
    <View className="flex items-center justify-center h-[70vh] w-full">
      <UIActivityIndicator color={colors.primaryText} />
    </View>
  );
}
