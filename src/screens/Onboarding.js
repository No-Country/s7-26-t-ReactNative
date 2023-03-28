import {useState} from 'react';
import { getAllSubCollDocs } from '../firebase/getFunctions';
import { StatusBar } from 'expo-status-bar';
import {Button,StyleSheet, Text, View } from 'react-native';

export default function Onboarding({navigation}) {

    const [state, setstate] = useState([])

    async function getData(){
        let data = await getAllSubCollDocs("equipos")
        if(data) return setstate(data)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Onboarding</Text>
            <Button
                title="IR A HOME"
                onPress={() => {
                    navigation.navigate('Home');
                }}
            />
            <View className="bg-red-500">
                <Text className="text-yellow-300">HOLAA</Text>
            </View>
            <StatusBar style="auto" />
            <Button onPress={() => getData()} title='Traer Datos'></Button>
            <Text>{JSON.stringify(state)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        color: "teal",
    }
});