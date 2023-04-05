import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Link, useTheme } from "@react-navigation/native";
import { SportCard } from './SportCard';



export const Sports = ({ setSport }) => {

    const { dark, colors } = useTheme();


   
    return (
        <>
          



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


