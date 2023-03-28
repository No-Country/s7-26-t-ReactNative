import 'react-native-gesture-handler';
import { Navigation } from './src/routes/Navigation';
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native"
});


export default function App() {

  return (
    <Navigation />
  );
}