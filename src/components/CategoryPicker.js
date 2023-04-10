import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';



const preloadCategories=[
    { id: 1, deporte: 'Fútbol' },
    { id: 2, deporte: 'Basquet' },
    { id: 3, deporte: 'Handball' },
    { id: 4, deporte: 'Tenis' },
    { id: 5, deporte: 'Voley' },
    { id: 6, deporte: 'E-sports' },
    { id: 7, deporte: 'Hockey' },
    { id: 8, deporte: 'Ciclismo' },
    { id: 9, deporte: 'Running' },
    { id: 10, deporte: 'Natación' }
  ]


const CategoryPicker = ({ selected, setSelected }) => {
    
    const { colors } = useTheme();

const [categories, setCategories] = useState(preloadCategories)


      

   
    const deleteCategory = (id) => {
      let pos = selected.map((e) => e.id).indexOf(id);
      selected.splice(pos, 1);
      setSelected(selected);
    };
  
    const addCategory = (category) => {
      setSelected([...selected, category]);
    };
  


    return (
      <View>
        
        <View style={styles.container}>
          {categories &&
            categories.map((cat) => {

                let found = selected.find((e) => e.id === cat.id);
            //console.log('found', found?.id, i)
            if (found) {

                console.log(selected)

                return (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => deleteCategory(cat.id)}
                    style={styles.selected}
                  >
                    <Text style={styles.sportNameActive}>{cat.deporte}</Text>
                  </TouchableOpacity>
                );
                } else {

                    return (
                        <TouchableOpacity
                          key={cat.id}
                          onPress={() => addCategory(cat)}
                          style={styles.unselected}
                        >
                          <Text style={styles.sportNameInactive}>{cat.deporte}</Text>
                        </TouchableOpacity>
                      );

                }
            })}
        </View>
      </View>
    );
  };
  
  export default CategoryPicker;
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    selected: {
      borderRadius: 8,
      padding: 10,
      height: 34,
      width: "45%",
      paddingHorizontal: 15,
      paddingVertical: 6,
      backgroundColor: '#673AB7',
      marginBottom: 10,
      marginRight: 10,
    },
    unselected: {
        width: "45%",
      borderRadius: 8,
      padding: 10,
      height: 34,
      paddingHorizontal: 15,
      paddingVertical: 6,
      backgroundColor: '#BDBDBD',
      marginBottom: 10,
      marginRight: 10,
    },
    sportNameInactive: {
        textAlign: "center",
        fontWeight: 600,
        color: "black"
    },
    sportNameActive: {
     fontWeight: 700,
      color: 'white',
      textAlign: "center"
    },
    subtitle: {
      
      marginBottom: 10,
    },
  });