import React, {useState}  from 'react'
import { Searchbar } from 'react-native-paper';
import { Text, View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import {Modal} from 'react-native'
import CategoryPicker from './CategoryPicker';
import Slider from "react-native-a11y-slider";


export const SearchBar = ({handleSearch, searchText }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const [distancia, setDistancia] = useState(0);


  const handleValue = (e) =>{
    setDistancia(e.value)
  }

  return (
        <View className=" mt-4 flex flex-row justify-around content-center items-center">
          <Searchbar
            
            onChangeText={handleSearch}
            value={searchText}
            inputStyle={styles.input}
            style={styles.search}
            icon={() => <FontAwesome name="search" size={24} color={'black'} />}
          />



<TouchableOpacity className="p-2 bg-indigo-900 w-24  h-10 rounded-md" onPress={()=> setModalVisible(true)} >
<Text className="text-base text-center font-bold text-white"> FILTROS </Text>

</TouchableOpacity>


<Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View className=" flex-1 justify-center items-end ">
          <View className="w-10/12 h-2.5/5  mr-5 mt-16  bg-white  pl-6 pr-6 pb-12 flex shadow-md z-5 border-2 border-indigo-400">
           

           <View>
           <Text className="text-base font-bold mb-2 mt-2">DEPORTES</Text>
          <View>
          <CategoryPicker selected={selected} setSelected={setSelected}/>
          </View>
           </View>



        <View className="mb-4">
        <Text className="text-base font-bold mb-2 mt-2">DISTANCIA {distancia}KM</Text>
        <Slider onChange={(e) => handleValue(e)} showLabel={false} min={1} max={1000} values={[0]} markerColor={"#673AB7"} />
        </View>

{/*           
           button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    }, */}
         
        <View className="w-max flex-row bg-red">
           <Pressable
              className="p-2 bg-indigo-400 w-6/12  h-10 rounded-md"
              onPress={() => setModalVisible(!modalVisible)}>
              <Text className="text-base text-center font-bold text-white">CANCELAR</Text>
            </Pressable>


            <Pressable
              className="p-2 bg-indigo-800 w-6/12 ml-4 h-10 rounded-md"
              onPress={() => setModalVisible(!modalVisible)}>
              <Text className="text-base text-center font-bold text-white">APLICAR</Text>
            </Pressable>

           </View>
            
          </View>
        </View>



      </Modal>
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
    },
   
   
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
   
  
  })

