import React from 'react'
import { ErrorPage } from '../components/ErrorPage'
import { View, TouchableOpacity, Text} from 'react-native'



export default function Stats({ navigation }) {
  return (
    <View className="flex h-full justify-center items-center">
      <ErrorPage/>


             {/* <TouchableOpacity 
             style={{ backgroundColor: "#FFC107", width: "55%" }}
             className="p-3 rounded-xl mb-6 mt-6 shadow-md"
             onPress={() => navigation.back()}>
                <Text className="text-gray-800 font-bold text-center text-base">
                  VOLVER
                </Text>
              </TouchableOpacity> */}

    </View>
  )
}
