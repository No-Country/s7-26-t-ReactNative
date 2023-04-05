import {FontAwesome5} from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Link, useTheme } from "@react-navigation/native";




export const SportCard = ({title, icon}) => {


  const { dark, colors } = useTheme();

  return (
    <View >
       <FontAwesome5 name={icon} size={80} color={dark?'white':"black"} />
       <Text className={dark?"text-white":"text-black"} >{title.toUpperCase()}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
    
      
      borderRadius: 10,
     
     
textAlign:"center",
      height: 150,
      alignItems: 'center',
      justifyContent: 'center',
      
    }
  });
  