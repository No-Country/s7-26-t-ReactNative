import {FontAwesome5} from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Link, useTheme } from "@react-navigation/native";




export const SportCard = ({title, icon}) => {


  const { dark, colors } = useTheme();

  return (
    <View style={styles.container}>
       <FontAwesome5 name={icon} size={100} color={dark?'white':"black"} />
       <Text className={dark?"text-white":"text-black"} >{title.toUpperCase()}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
    
      
      borderRadius: 10,
      width: "45%",
     

      height: 150,
      alignItems: 'center',
      justifyContent: 'center',
      
    }
  });
  