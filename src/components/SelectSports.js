import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Link, useTheme } from "@react-navigation/native";
import { SportCard } from './SportCard';
import { ListSpecificTournaments } from '../firebase/getFunctions';
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";



export const Sports = ({ setSport, setPartidosFiltrados }) => {

    async function getSpecificSport(tournament){
        setSport(tournament)
        const data = await ListSpecificTournaments(tournament)
        setPartidosFiltrados(data? data : null)
      }

    const { dark, colors } = useTheme();



    return (
        <>




            <View className={"mt-4 h-auto rounded-sm items-center justify-center" + (dark ? "bg-slate-700/60" : "bg-transparent")}>




                <View className="flex-wrap flex-row justify-between">

<View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => getSpecificSport("Futbol")}
                    >
                        <SportCard title="futbol" icon="futbol" />
                    </TouchableOpacity>
</View>

<View style={styles.container}>


                    <TouchableOpacity
                        onPress={() => getSpecificSport("Basquet")}
                    >
                        <SportCard title="basquet" icon="basketball-ball" />

                    </TouchableOpacity>

</View >

<View style={styles.container}>

                    <TouchableOpacity
                        onPress={() => getSpecificSport("Voley")}
                    >
                        <SportCard title="vóley" icon="volleyball-ball" />
                    </TouchableOpacity>
</View>

<View style={styles.container}>

                    <TouchableOpacity
                        onPress={() => getSpecificSport("Futbol-5")}
                    >
                    <SportCard title="futbol 5" icon="futbol" />
                </TouchableOpacity>
</View>

            </View>
        </View >
        </>
    )
}


const styles = StyleSheet.create({
    container: {
    
      
      borderRadius: 10,
      width: "45%",
     
      textAlign:"center",
      height: 150,
      alignItems: 'center',
      justifyContent: 'center',
      
    }
  });
