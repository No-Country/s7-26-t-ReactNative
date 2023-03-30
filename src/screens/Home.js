import { useTheme } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';

 function Home({}) {

  const { colors } = useTheme()

  return (
    <ScrollView className="h-full">
    <View className="flex items-center mx-auto my-4 justify-center h-full">

      <Text style={{color: colors.text}} className="text-5xl">Torneopalooza</Text>
      <Text style={{color: colors.text}} className="text-2xl">S7-26T React Native</Text>

    </View>
    </ScrollView>
  );
}

export default Home;