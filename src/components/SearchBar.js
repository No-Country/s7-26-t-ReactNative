import React from 'react'
import { Searchbar } from 'react-native-paper';
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';


export const SearchBar = ({handleSearch, searchText }) => {
  return (
        <View className="flex flex-row justify-around content-center items-center">
          <Searchbar
            
            onChangeText={handleSearch}
            value={searchText}
            inputStyle={styles.input}
            style={styles.search}
            icon={() => <FontAwesome name="search" size={24} color={'black'} />}
          />

          <Text className="p-2 bg-indigo-600 my-4 text-white"> FILTROS </Text>
        </View>
  )
}


const styles = StyleSheet.create({
    search: {
      width: '70%',
      border: 'none',
      height: 40,
      elevation: 0,
      borderRadius: 2,
      borderTopWidth: 0, //works
      borderBottomWidth: 0, //works
    },
    input: {
      marginTop: -6
    }
  
  })

