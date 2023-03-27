import { StatusBar } from 'expo-status-bar';
import {Button,StyleSheet, Text, View } from 'react-native';

export default function Onboarding({navigation}) {
    return (

        <View style={styles.container}>
            <Text style={styles.title}>Onboarding</Text>
            <Button
                title="IR A HOME"
                onPress={() => {
                    navigation.navigate('Home');
                }}
            />
            <StatusBar style="auto" />
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