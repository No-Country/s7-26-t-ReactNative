import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Link, useTheme } from "@react-navigation/native";
import { SportCard } from './SportCard';



export const Sports = ({ setSport, tournaments, setTournaments, getTournaments }) => {

    const { dark, colors } = useTheme();


    const tournamentHalder = () =>{
        setTournaments(true)
        getTournaments()
        console.log(tournaments)
    }

    return (
        <>
            <View className={"flex-row w-full justify-around mt-5"}>

                <TouchableOpacity 
                onPress={() => tournamentHalder()}
                >
                    <Text
                        className={

                            (dark ? "text-white" : "text-black")
                        }
                    >TORNEOS</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text className={(dark ? "text-white" : "text-black")}> DEPORTES</Text>
                </TouchableOpacity>

            </View>



            <View className={"mt-4 h-auto rounded-sm items-center justify-center" + (dark ? "bg-slate-700/60" : "bg-transparent")}>




                <View className="flex-wrap flex-row justify-between">


                    <SportCard title="futbol" icon="futbol" />
                    <SportCard title="basquet" icon="basketball-ball" />
                    <SportCard title="vóley" icon="volleyball-ball" />
                    <SportCard title="futbol 5" icon="futbol" />


                </View>
            </View>
        </>
    )
}


