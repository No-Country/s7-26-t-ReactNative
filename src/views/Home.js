import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

 function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tournament App</Text>
      <Text>S7 - 26 - React Native</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize:28,
    color:"teal",
  }
});


export default Home;