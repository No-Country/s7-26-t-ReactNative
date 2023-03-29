import 'react-native-gesture-handler';
import { DrawerNavigation } from './src/routes/Navigation';
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native"
});


export default function App() {

  return (
    <DrawerNavigation />
  );
}